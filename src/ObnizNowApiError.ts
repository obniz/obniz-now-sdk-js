import { ResponseError } from "./sdk-core/runtime";

/**
 * All API methods automatically convert ResponseError to ObnizApiError
 * 
 * @example
 * ```typescript
 * try {
 *   await client.machines.getMachine({ id: 'invalid-id' });
 * } catch (error) {
 *   if (error instanceof ObnizNowApiError) {
 *     console.error(`API Error [${error.status}]: ${error.message}`);
 *     console.error('Error data:', error.data);
 *   }
 * }
 * ```
 */
export class ObnizNowApiError extends Error {
  /** HTTP status code (e.g., 404, 500) */
  public readonly status: number;
  
  /** HTTP status text (e.g., "Not Found", "Internal Server Error") */
  public readonly statusText: string;
  
  /** Parsed response body data */
  public readonly data: any;
  
  /** Original ResponseError for advanced use cases */
  public readonly originalError!: ResponseError;

  constructor(responseError: ResponseError, status: number, statusText: string, data: any) {
    const message = data?.error || data?.message || statusText || `HTTP ${status}`;
    super(message);
    
    this.name = "ObnizNowApiError";
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    
    // Store originalError as non-enumerable property to keep it out of console.log
    // but still accessible for advanced use cases
    Object.defineProperty(this, 'originalError', {
      value: responseError,
      writable: false,
      enumerable: false,
      configurable: false
    });
    
    // Maintain proper stack trace (Node.js only)
    if ('captureStackTrace' in Error) {
      (Error as any).captureStackTrace(this, ObnizNowApiError);
    }
  }

  /**
   * Create ObnizNowApiError from ResponseError by parsing the response
   */
  static async fromResponseError(error: ResponseError): Promise<ObnizNowApiError> {
    const status = error.response.status;
    const statusText = error.response.statusText;
    
    let data: any;
    try {
      // Try to parse as JSON
      const text = await error.response.text();
      data = JSON.parse(text);
    } catch {
      // If not JSON, wrap as error object
      try {
        data = { error: await error.response.text() };
      } catch {
        data = { error: statusText };
      }
    }
    
    return new ObnizNowApiError(error, status, statusText, data);
  }
  
  /**
   * Get response headers (useful for rate limiting, caching, etc.)
   * 
   * @example
   * ```typescript
   * const rateLimit = error.getResponseHeaders().get('x-ratelimit-remaining');
   * ```
   */
  getResponseHeaders(): Headers {
    return this.originalError.response.headers;
  }
  
  /**
   * Get full request URL
   */
  getRequestUrl(): string {
    return this.originalError.response.url;
  }
  
  /**
   * Control JSON serialization - don't include originalError
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusText: this.statusText,
      data: this.data,
      stack: this.stack,
    };
  }
}

/**
 * Wraps an API object to automatically convert ResponseError to ObnizNowApiError
 */
export function wrapApiWithErrorHandling<T extends object>(api: T): T {
  return new Proxy(api, {
    get(target, prop) {
      const original = target[prop as keyof T];
      
      // Only wrap functions
      if (typeof original !== 'function') {
        return original;
      }
      
      // Return wrapped function that auto-converts errors
      return async function(this: any, ...args: any[]) {
        try {
          return await original.apply(this, args);
        } catch (error) {
          // Convert ResponseError to ObnizNowApiError
          if (error instanceof ResponseError) {
            throw await ObnizNowApiError.fromResponseError(error);
          }
          // Re-throw other errors as-is
          throw error;
        }
      };
    }
  });
}

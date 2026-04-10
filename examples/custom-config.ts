/**
 * Custom Configuration Example
 * 
 * This example demonstrates:
 * - Using custom base URL (e.g., for local development)
 * - Custom fetch implementation
 * - Different authentication methods
 */

import { ObnizNow } from '../src/index';

// Example 1: Custom fetch with logging
function withLogging() {
  const customFetch: typeof fetch = async (input, init?) => {
    console.log('API Request:', input);
    console.log('Options:', init);
    
    const response = await fetch(input, init);
    
    console.log('API Response:', response.status, response.statusText);
    
    return response;
  };

  const client = new ObnizNow({
    token: process.env.OBNIZ_TOKEN || 'your-api-token',
    fetch: customFetch
  });

  return client;
}

// Example 2: Custom fetch with retry logic
function withRetry() {
  const fetchWithRetry: typeof fetch = async (input, init?) => {
    const maxRetries = 3;
    let lastError: Error | undefined;

    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(input, init);
        
        if (response.ok || response.status < 500) {
          return response;
        }
        
        console.log(`Retry ${i + 1}/${maxRetries} due to ${response.status}`);
      } catch (error) {
        lastError = error as Error;
        console.log(`Retry ${i + 1}/${maxRetries} due to error:`, error);
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
    
    throw lastError || new Error('Max retries exceeded');
  };

  const client = new ObnizNow({
    token: process.env.OBNIZ_TOKEN || 'your-api-token',
    fetch: fetchWithRetry
  });

  return client;
}

async function main() {
  // Use client with logging
  const loggingClient = withLogging();
  
  // Use client with retry logic
  const retryClient = withRetry();
  
  try {
    // Example API call with retry client
    const machines = await retryClient.machines.listMachines({ limit: 5 });
    console.log(`Found ${machines.count} machines`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

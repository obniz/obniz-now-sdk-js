/**
 * Advanced Error Handling Example
 * 
 */

import { ObnizNow, ObnizNowApiError } from '../src/index';

async function main() {
  const client = new ObnizNow({
    token: "invalid-token-for-testing",
  });

  try {
    await client.events.listEvents({ limit: 10 });
  } catch (error) {
    if (error instanceof ObnizNowApiError) {
      console.log("=== Basic ===");
      console.log(`Status: ${error.status}`);
      console.log(`Message: ${error.message}`);
      console.log(`Data:`, error.data);
      
      console.log("\n=== Advanced Usage (2 Methods) ===");
      
      // Method 1: Convenient methods (recommended)
      console.log("\n1. Using methods:");
      const headers = error.getResponseHeaders();
      console.log(`  Request URL: ${error.getRequestUrl()}`);
      console.log(`  Content-Type: ${headers.get('content-type')}`);
      
      const rateLimitRemaining = headers.get('x-ratelimit-remaining');
      if (rateLimitRemaining) {
        console.log(`  Rate Limit: ${rateLimitRemaining} requests remaining`);
      }
      
      // Method 2: Direct access to originalError (for advanced use cases)
      console.log("\n2. Using originalError (for advanced use cases):");
      console.log(`  Response type: ${error.originalError.response.type}`);
      console.log(`  Was redirected: ${error.originalError.response.redirected}`);
      
      // 3. JSON serialization is now clean
      console.log("\n3. JSON.stringify() - clean output:");
      console.log(JSON.stringify(error, null, 2));
    }
  }
}

main();

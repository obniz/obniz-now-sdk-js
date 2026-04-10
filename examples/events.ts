/**
 * Events Example
 * 
 * This example demonstrates:
 * - Retrieving machine events
 * - Filtering events by time range
 * - Working with event data
 * - Automatic error handling with ObnizApiError
 */

import { ObnizNow, ObnizNowApiError } from '../src/index';

async function main() {
  const client = new ObnizNow({ 

    baseUrl: "http://localhost:8080", // Use local development server
    token: process.env.OBNIZ_TOKEN || "token_9QdmEKwpwAGLQ8N8nRWjmRTsj4wLg6nl",  });

  try {
    // Get recent events for all machines
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const eventsResponse = await client.events.listEvents({
      start: oneDayAgo.toISOString(),
      end: now.toISOString(),
      limit: 50
    });

    console.log(`Found ${eventsResponse.count} events in the last 24 hours`);

    eventsResponse.items.forEach((event) => {
      console.log(`\n[${event.ts}] ${event.type}`);
      console.log(`  Machine: ${event.machineId}`);
      if (event.value) {
        console.log(`  Data:`, JSON.stringify(event.value, null, 2));
      }
    });

    // Get events for a specific machine
    const machines = await client.machines.listMachines({ limit: 1 });
    
    if (machines.items.length > 0) {
      const machineId = machines.items[0].machine.id!;

      const machineEvents = await client.events.listEvents({
        machineIds: [machineId],
        start: oneDayAgo.toISOString(),
        end: now.toISOString(),
        limit: 20
      });

      console.log(`\n\nRecent events for machine ${machineId}:`);
      console.log(`Total: ${machineEvents.count}`);
    }
  } catch (error) {
    console.error('Error:', error);
    console.log((error as ObnizNowApiError).originalError.response.headers);
    console.log((error as ObnizNowApiError).originalError.message);

  }
}

main();

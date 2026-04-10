/**
 * Basic Usage Example
 *
 * This example demonstrates:
 * - SDK initialization
 * - Authentication with API token
 * - Listing machines
 * - Error handling
 */

import { ObnizNow } from "../src/index";

async function main() {
  // Initialize the SDK with your API token
  const client = new ObnizNow({
    token: process.env.OBNIZ_TOKEN || "your-api-token",
  });

  try {
    // List all machines with pagination
    const response = await client.machines.listMachines({
      limit: 10,
      offset: 0,
    });

    console.log(`Found ${response.count} machines`);

    response.items.forEach((item) => {
      console.log(`- ${item.machine.name} (${item.machine.id})`);
    });

    // Get a specific machine
    if (response.items.length > 0) {
      const machineId = response.items[0].machine.id!;
      const machineWithState = await client.machine.getMachine({ machineId });
      if (machineWithState.machine) {
        console.log("\nMachine details:");
        console.log(`Name: ${machineWithState.machine.name}`);
        console.log(`ID: ${machineWithState.machine.id}`);
        console.log(`Created: ${machineWithState.machine.createdAt}`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

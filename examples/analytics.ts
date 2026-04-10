/**
 * Analytics Example
 *
 * This example demonstrates:
 * - Executing analytics queries
 * - Retrieving analytics results
 * - Working with different analytics types
 */

import { ObnizNow } from "../src/index";

async function main() {
  const client = new ObnizNow({
    token: process.env.OBNIZ_TOKEN || "your-api-token",
  });

  try {
    // Get list of machines
    const machines = await client.machines.listMachines({ limit: 1 });

    if (machines.items.length === 0) {
      console.log("No machines found");
      return;
    }

    const machineId = machines.items[0].machine.id!;
    console.log(`Running analytics for machine: ${machineId}`);

    // Execute basic statistics analytics
    const analyticsResults = await client.analytics.getAnalyticsResults({
      analyticsModelId: "model_id",
      unitId: machineId,
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      end: new Date().toISOString(),
    });

    console.log("\nAnalytics Results:");
    console.log(`Found ${analyticsResults.length} results`);
    analyticsResults.forEach((result, index) => {
      console.log(`\nResult ${index + 1}:`);
      console.log(JSON.stringify(result, null, 2));
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

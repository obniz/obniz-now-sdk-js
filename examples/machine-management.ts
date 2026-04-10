/**
 * Machine Management Example
 * 
 * This example demonstrates:
 * - Creating a new machine
 * - Updating machine settings
 * - Managing machine groups
 * - Deleting machines
 */

import { ObnizNow } from '../src/index';

async function main() {
  const client = new ObnizNow({ 
    token: process.env.OBNIZ_TOKEN || 'your-api-token'
  });

  try {
    // Create a new machine
    console.log('Creating a new machine...');
    const newMachine = await client.machines.addMachine({
      addMachineRequest: {
        name: 'Test Machine',
        obnizRegistrateUrl: 'https://obniz.com/ja/register?token=example-token',
      }
    });

    console.log(`Created machine: ${newMachine.machine.id} (${newMachine.machine.name})`);

    // List all groups
    console.log('\nListing groups...');
    const groups = await client.groups.listGroups({
      limit: 10
    });

    console.log(`Found ${groups.count} groups`);
    groups.items.forEach((group) => {
      console.log(`- ${group.name} (${group.id})`);
    });

    // Get machine details
    console.log('\nFetching machine details...');
    const machineDetails = await client.machine.getMachine({
      machineId: newMachine.machine.id!
    });

    console.log('Machine details:');
    console.log(`  Name: ${machineDetails.name}`);
    console.log(`  ID: ${machineDetails.id}`);
    console.log(`  Created: ${machineDetails.createdAt}`);

    console.log('\nExample completed successfully!');

  } catch (error) {
    console.error('Error:', error);
  }
}

main();

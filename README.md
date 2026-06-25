# Obniz SDK

TypeScript/JavaScript SDK for Obniz Now API

## Installation
```bash
npm install @obniz/obniz-now-sdk
```

## Authentication

The SDK supports authentication using an API token (Bearer token). You can obtain your API token from your [Obniz account settings](https://obniz.com/).

### Using API Token
```typescript
import { ObnizNow } from '@obniz/obniz-now-sdk';

const client = new ObnizNow({ 
  token: 'your-api-token-here'
});
```

### Using Environment Variables (Recommended)
```typescript
const client = new ObnizNow({ 
  token: process.env.OBNIZ_NOW_TOKEN
});
```

## Basic Usage

### List Machines

```typescript
import { ObnizNow } from '@obniz/obniz-now-sdk';

const client = new ObnizNow({ token: process.env.OBNIZ_TOKEN });

// Get list of machines
const response = await client.machines.listMachines({ 
  limit: 10,
  offset: 0 
});

console.log(`Found ${response.count} machines`);
response.items.forEach((item) => {
  console.log(`- ${item.machine.name} (${item.machine.id})`);
});
```

### Get Machine Details
```typescript
// Get specific machine
const machine = await client.machine.getMachine({ 
  machineId: 'machine-id' 
});

console.log(`Name: ${machine.name}`);
console.log(`Created: ${machine.createdAt}`);
```

### Get Events
```typescript
// Get recent events
const events = await client.events.listEvents({
  from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  to: new Date().toISOString(),
  limit: 20
});

console.log(`Found ${events.count} events`);
```

## Error Handling

All API errors are automatically converted to `ObnizNowApiError` with parsed response data.

```typescript
import { ObnizNow, ObnizNowApiError } from '@obniz/obniz-now-sdk';

try {
  const machine = await client.machine.getMachine({ machineId: 'invalid-id' });
} catch (error) {
  if (error instanceof ObnizNowApiError) {
    console.error(`Error ${error.status}: ${error.message}`);
    console.error('Details:', error.data);
    
    // Access response headers
    const headers = error.getResponseHeaders();
    const rateLimit = headers.get('x-ratelimit-remaining');
    
    // Get request URL for debugging
    console.error('Failed request:', error.getRequestUrl());
  }
}
```

## Browser Usage (Svelte)

### ⚠️ Security Warning
**Never expose your API token in client-side code!** Use one of these safe approaches:

### Option 1: Cookie-based Authentication (Recommended for custom pages)
```typescript
import { ObnizNow } from '@obniz/obniz-now-sdk';

const client = new ObnizNow({
  baseUrl: window.location.origin,
  cookies: {
    // In browsers, existing same-origin cookies are sent by fetch(credentials: "include").
    // These values are used only by non-browser runtimes where Cookie headers can be set.
    token: '',
    accountId: '',
  },
});

const machines = await client.machines.listMachines({ limit: 20 });
```

Your backend should set httpOnly cookies after user authentication.

For plain custom page HTML, import the browser bundle from a CDN or from a file hosted with the page:

```html
<script type="module">
  import { ObnizNow } from "https://cdn.jsdelivr.net/npm/@obniz/obniz-now-sdk@0.1.11/dist/index.mjs";

  const client = new ObnizNow({
    baseUrl: window.location.origin,
    cookies: { token: "", accountId: "" },
  });

  const response = await client.machines.listMachines({ limit: 10, offset: 0 });
  console.log(response.items);
</script>
```

### Option 2: Backend Proxy
```typescript
// Frontend - call your backend API
const machines = await fetch('/api/obniz/machines').then(r => r.json());

// Backend (Node.js) - proxy to Obniz API
app.get('/api/obniz/machines', async (req, res) => {
  const client = new ObnizNow({ token: process.env.OBNIZ_TOKEN });
  const data = await client.machines.listMachines({ limit: 20 });
  res.json(data);
});
```

### SvelteKit Server-Side Example
```typescript
// src/routes/+page.server.ts
import { ObnizNow } from '@obniz/obniz-now-sdk';

export async function load() {
  const client = new ObnizNow({ token: process.env.OBNIZ_TOKEN });
  const machines = await client.machines.listMachines({ limit: 20 });
  
  return { machines: machines.items };
}
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<h1>Machines</h1>
<ul>
  {#each data.machines as item}
    <li>{item.machine.name}</li>
  {/each}
</ul>
```

## Examples
See the examples/ directory for more detailed examples:

`basic-usage.ts` - SDK initialization and basic operations

`analytics.ts` - Working with analytics

`events.ts` - Retrieving and filtering events

`machine-management.ts` - CRUD operations

`custom-config.ts` - Advanced configuration (retry, logging)

`advanced-error-handling.ts` - Error inspection and debugging

## API Categories

The `ObnizNow` client exposes generated API groups including:

`account`, `analytics`, `auditLogs`, `connectionModels`, `connections`, `converters`, `customizes`, `events`, `firmware`, `groups`, `inboundConnections`, `inboundSources`, `integrations`, `intelligences`, `invitations`, `issues`, `machine`, `machines`, `notificationHistory`, `notifications`, `obniz`, `reports`, `session`, `threads`, `units`, and `users`.

### Run any example:
```bash
npx tsx examples/basic-usage.ts
```

# Requirements
Node.js >= 18.0.0

# Links
Website: 
https://iot.obniz.com

API documentation: https://now.obniz.com/api/1/docs/

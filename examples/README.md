# Obniz SDK Examples

This directory contains practical examples demonstrating how to use the Obniz SDK.

## Quick Reference

| Example | Use Case | Key APIs |
|---------|----------|----------|
| `basic-usage.ts` | Getting started, listing resources | `machines.listMachines()`, `machine.getMachine()` |
| `analytics.ts` | Data analysis and insights | `analytics.getAnalyticsResults()` |
| `events.ts` | Event monitoring and filtering | `events.listEvents()` |
| `machine-management.ts` | CRUD operations | `machines.addMachine()`, `groups.*` |
| `custom-config.ts` | Advanced setup (retry, logging, dev) | Custom fetch |
| `advanced-error-handling.ts` | Error inspection and debugging | `ObnizNowApiError`, `getResponseHeaders()` |
| `browser-simple.html` | Browser usage | `machines.listMachines` |

## Prerequisites

Before running these examples, you need:

1. Node.js 18 or higher
2. An Obniz API token (get it from your Obniz account)
3. Token must have enought permissions to make request to API

## Setup

1. Install dependencies:
```bash
npm install @obniz/sdk
```

2. Set your API token as an environment variable:
```bash
export OBNIZ_TOKEN="your-api-token-here"
```

Or modify the examples to use your token directly (not recommended for production).

## Examples

### 1. Basic Usage (`basic-usage.ts`)
Introduction to SDK initialization, authentication, and basic machine operations.

```bash
npx tsx examples/basic-usage.ts
```

**Covered features:**
- How to initialize the SDK
- List machines with pagination
- Get machine details
- Basic error handling

---

### 2. Analytics (`analytics.ts`)
Working with analytics and data insights.

```bash
npx tsx examples/analytics.ts
```

**Covered features:**
- Execute analytics queries
- Retrieve analytics results
- Work with time ranges
- Handle analytics data

---

### 3. Events (`events.ts`)
Retrieving and filtering machine events.

```bash
npx tsx examples/events.ts
```

**Covered features:**
- List events across all machines
- Filter events by time range
- Get events for specific machines
- Parse event data

---

### 4. Machine Management (`machine-management.ts`)
Complete CRUD operations for machines.

```bash
npx tsx examples/machine-management.ts
```

**Covered features:**
- Create new machines
- Update machine settings
- Manage machine groups
- Delete machines

---

### 5. Custom Configuration (`custom-config.ts`)
Advanced SDK configuration options.

```bash
npx tsx examples/custom-config.ts
```

**Covered features:**
- Use custom base URLs (local development)
- Implement custom fetch with logging
- Add retry logic
---

### 6. Advanced Error Handling (`advanced-error-handling.ts`)
Inspecting API errors and accessing response metadata.

```bash
npx tsx examples/advanced-error-handling.ts
```

**Covered features:**
- Access parsed error data (`status`, `message`, `data`)
- Read response headers for rate limiting
- Get request URL for debugging
- Use `originalError` for low-level access

---

### 7. Browser Examples

#### `browser-simple.html`
Simple browser example.

**Open in browser:**
```bash
open examples/browser-simple.html
```

**Covered features:**
- Use SDK in the browser

## Running Examples with TypeScript

All examples are written in TypeScript. You can run them directly using `tsx`:

```bash
npx tsx examples/[example-name].ts
```

Or compile and run with Node.js:

```bash
npx tsc examples/[example-name].ts --module commonjs --target es2020
node examples/[example-name].js
```

## API Reference

For complete API documentation, refer to the JSDoc comments in the SDK source code or visit the [Obniz documentation](https://now.obniz.com/api/1/docs//).

## Troubleshooting

### Error: "Either 'token' or 'cookies' must be provided"
Make sure you set the `OBNIZ_TOKEN` environment variable:
```bash
export OBNIZ_TOKEN="your-token-here"
```

### Module not found errors
Install dependencies first:
```bash
npm install
```

### TypeScript errors
Check that you have TypeScript installed:
```bash
npm install -D typescript tsx
```

### Permission errors (403/401)
- Verify your API token is valid
- Check that your token has the required permissions

## See Also

- [Main README](../README.md) - Installation and quick start
- [API Documentation](https://now.obniz.com/api/1/docs/) - Full API reference

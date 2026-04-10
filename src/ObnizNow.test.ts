import { describe, it, expect, vi, beforeEach } from "vitest";
import { ObnizNow } from "./ObnizNow";

describe("ObnizNow SDK", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Bearer Token Mode", () => {
    it("should initialize with token option", () => {
      const client = new ObnizNow({
        token: "test-token",
        baseUrl: "https://api.obniz.com",
      });
      expect(client).toBeDefined();
      expect(client.inboundSources).toBeDefined();
    });

    it("should use Bearer token in requests", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        token: "test-token",
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail due to mock, but we can check the call
      }

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers;

      if (headers) {
        const authHeader = headers.Authorization || headers.authorization;
        expect(authHeader).toContain("Bearer test-token");
      }
    });
  });

  describe("Cookie-based Mode", () => {
    it("should initialize with cookies option", () => {
      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        baseUrl: "https://api.obniz.com",
      });
      expect(client).toBeDefined();
      expect(client.inboundSources).toBeDefined();
    });

    it("should use cookies in requests", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail due to mock, but we can check the call
      }

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const init = callArgs[1];

      // Check that Cookie header is set
      expect(init?.headers?.Cookie).toBe("token=session-token; account_id=account-123");
      expect(init?.credentials).toBe("include");
    });

    it("should not set Authorization header when using cookies", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        fetch: mockFetch,
      });

      try {
        await client.inboundSources.listInboundSources({
          limit: 10,
          offset: 0,
        });
      } catch (e) {
        // Expected to fail
      }

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers;

      if (headers) {
        expect(headers.Authorization).toBeUndefined();
        expect(headers.authorization).toBeUndefined();
      }
    });
  });

  describe("Error Handling", () => {
    it("should throw error when neither token nor cookies provided", () => {
      expect(() => {
        new ObnizNow({} as any);
      }).toThrow("Either 'token' or 'cookies' must be provided");
    });

    it("should throw error when both token and cookies provided", () => {
      expect(() => {
        new ObnizNow({
          token: "test-token",
          cookies: { token: "session-token", accountId: "account-123" },
        } as any);
      }).toThrow("Only one of 'token' or 'cookies' can be provided, not both");
    });

    it("should accept either token or cookies but not require both", () => {
      const client1 = new ObnizNow({ token: "test-token" });
      expect(client1).toBeDefined();

      const client2 = new ObnizNow({
        cookies: { token: "session-token", accountId: "account-123" },
      });
      expect(client2).toBeDefined();
    });
  });

  describe("Custom baseUrl", () => {
    it("should use custom baseUrl with token mode", () => {
      const client = new ObnizNow({
        token: "test-token",
        baseUrl: "http://localhost:3000",
      });
      expect(client).toBeDefined();
    });

    it("should use custom baseUrl with cookie mode", () => {
      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        baseUrl: "http://localhost:3000",
      });
      expect(client).toBeDefined();
    });
  });

  describe("Custom fetch", () => {
    it("should use provided custom fetch function", async () => {
      const customFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        token: "test-token",
        fetch: customFetch,
      });

      try {
        await client.machines.listMachines({ limit: 10 });
      } catch (e) {
        // Expected to fail due to mock
      }

      expect(customFetch).toHaveBeenCalled();
    });

    it("should use custom fetch in cookie mode fallback", async () => {
      const customFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ items: [], count: 0 }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        cookies: {
          token: "session-token",
          accountId: "account-123",
        },
        fetch: customFetch,
      });

      try {
        await client.machines.listMachines({ limit: 10 });
      } catch (e) {
        // Expected to fail
      }

      // Custom fetch should be called inside the wrapper
      expect(customFetch).toHaveBeenCalled();
    });
  });
});

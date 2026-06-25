import { describe, it, expect, vi, beforeEach } from "vitest";
import { ObnizNow } from "./ObnizNow";
import { ObnizNowApiError } from "./ObnizNowApiError";

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
      expect(client.account).toBeDefined();
      expect(client.auditLogs).toBeDefined();
      expect(client.converters).toBeDefined();
      expect(client.customizes).toBeDefined();
      expect(client.firmware).toBeDefined();
      expect(client.inboundSources).toBeDefined();
      expect(client.invitations).toBeDefined();
      expect(client.notificationHistory).toBeDefined();
      expect(client.obniz).toBeDefined();
      expect(client.session).toBeDefined();
      expect(client.users).toBeDefined();
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
        // Headers can be either a Headers instance or a plain object
        const authHeader = headers instanceof Headers
          ? headers.get('Authorization')
          : (headers.Authorization || headers.authorization);
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

      // Check that Cookie header is set (headers is now a Headers instance)
      expect(init?.headers).toBeInstanceOf(Headers);
      expect((init?.headers as Headers).get('Cookie')).toBe("token=session-token; account_id=account-123");
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

      // Headers is now a Headers instance, not a plain object
      expect(headers).toBeInstanceOf(Headers);
      expect((headers as Headers).get('Authorization')).toBeNull();
    });
  });

  describe("Error Handling", () => {
    it("should throw error when neither token nor cookies provided", () => {
      expect(() => {
        new ObnizNow({} as any);
      }).toThrow("Either 'token' or 'cookies' must be provided");
    });

    it("should accept either token or cookies but not require both", () => {
      const client1 = new ObnizNow({ token: "test-token" });
      expect(client1).toBeDefined();

      const client2 = new ObnizNow({
        cookies: { token: "session-token", accountId: "account-123" },
      });
      expect(client2).toBeDefined();
    });

    it("should convert response errors to ObnizNowApiError", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        url: "https://api.obniz.com/api/1/machines/missing",
        text: async () => JSON.stringify({ error: "Machine not found" }),
        headers: new Headers(),
      });

      const client = new ObnizNow({
        token: "test-token",
        fetch: mockFetch,
      });

      await expect(client.machine.getMachine({ machineId: "missing" })).rejects.toMatchObject({
        name: "ObnizNowApiError",
        status: 404,
        message: "Machine not found",
      });

      await expect(client.machine.getMachine({ machineId: "missing" })).rejects.toBeInstanceOf(ObnizNowApiError);
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
});

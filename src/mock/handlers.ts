import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/healthz", () => HttpResponse.json({ ok: true })),

  http.get("/api/users", () =>
    HttpResponse.json([
      { id: "1", name: "Alice", role: "admin" },
      { id: "2", name: "Bob", role: "reader" },
    ])
  ),

  http.post("/api/login", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const { username } = (body as any) ?? {};
    return HttpResponse.json({
      token: "dev-token",
      user: { id: "1", name: username ?? "Dev User" },
    });
  })
];

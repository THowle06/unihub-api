import request from "supertest";

import app from "../../src/app";

export async function createTestUser() {
  const email = `test-${Date.now()}-${Math.random()}@example.com`;
  const password = "Password123!";
  const name = "Test User";

  const response = await request(app).post("/api/auth/sign-up/email").send({
    name,
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(`Failed to create test user: ${JSON.stringify(response.body)}`);
  }

  return {
    email,
    password,
    name,
    response,
  };
}

export async function createAuthenticatedAgent() {
  const agent = request.agent(app);

  const email = `agent-${Date.now()}-${Math.random()}@example.com`;
  const password = "Password123!";
  const name = "Authenticated User";

  const response = await agent.post("/api/auth/sign-up/email").send({
    name,
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error(`Failed to create authenticated user: ${JSON.stringify(response.body)}`);
  }

  return {
    agent,
    email,
    password,
    name,
  };
}

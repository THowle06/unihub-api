export interface HealthResponse {
  status: "ok" | "error";
  timestamp: string;
}

export interface ApiHealthResponse extends HealthResponse {
  uptime: number;
}

export interface DatabaseHealthResponse extends HealthResponse {
  database: "connected" | "disconnected";
}

import app from "./app";
import { config } from "./config";
import prisma from "./lib/prisma";

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const shutdown = (signal: string) => {
  console.log(`Received ${signal}, shutting down...`);

  server.close(() => {
    prisma
      .$disconnect()
      .then(() => {
        console.log("Database disconnected.");
        process.exit(0);
      })
      .catch((err) => {
        console.error("Error during disconnection:", err);
        process.exit(1);
      });
  });
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

import { env } from "./env";

export const config = {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
};

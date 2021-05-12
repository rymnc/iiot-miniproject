import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";
import {} from "fastify-cors";
import {} from "fastify-jwt";

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  void fastify.register(require("fastify-cors"), {
    // put your options here
    origin: (
      origin: string,
      cb: (arg0: Error | null, arg1: boolean) => void
    ) => {
      cb(null, true);
    },
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
  void fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });
};

export default app;
export { app };

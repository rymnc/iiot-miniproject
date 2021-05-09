import { FastifyPluginAsync } from "fastify";

const v1: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { v1: true };
  });

  fastify.get("/health", async function (request, reply) {
    return { healthy: true };
  });
};

export default v1;

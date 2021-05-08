import { FastifyPluginAsync } from "fastify";

const v1: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { v1: true };
  });
};

export default v1;

import { FastifyPluginAsync } from "fastify";
import { Login, LoginType, LoginResponse, LoginResponseType } from "./schemas";
import { compare } from "bcrypt";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return { auth: true };
  });

  fastify.post<{ Body: LoginType; Response: LoginResponseType }>(
    "/login",
    {
      schema: {
        body: Login,
        response: {
          200: LoginResponse,
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await fastify.db.user.findUnique({
        where: {
          email,
        },
      });
      if (user === null) {
        reply.unauthorized("Invalid email/password");
      } else if (await compare(password, user.password)) {
        const { firstName, lastName, email, id } = user;
        const token = await fastify.jwt.sign(
          { firstName, lastName, email },
          { expiresIn: "15m" }
        );
        await fastify.db.tokens.create({
          data: {
            userId: id,
            type: "ACCESS",
            value: token,
          },
        });
        reply.status(200).send({ token });
      } else {
        reply.unauthorized("Invalid email/password");
      }
    }
  );

  fastify.get(
    "/logout",
    {
      schema: {
        response: {
          204: {
            type: "boolean",
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = await request.jwtVerify();
      fastify.log.info(email, ": logged out");
      reply.status(200).send(true);
    }
  );

  fastify.get(
    "/validate",
    {
      schema: {
        response: {
          200: {
            type: "boolean",
          },
        },
      },
    },
    async (request, reply) => {
      try {
        await request.jwtVerify();
        reply.status(200).send(true);
      } catch (e) {
        reply.status(200).send(false);
      }
    }
  );
};

export default auth;

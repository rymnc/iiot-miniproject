import { FastifyPluginAsync } from "fastify";
import { User, UserType, Get, GetType, Update, UpdateType } from "./schemas";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return { users: true };
  });

  fastify.post<{ Body: UserType; Response: UserType }>(
    "/",
    {
      schema: {
        body: User,
        response: {
          201: User,
        },
      },
    },
    async (request, reply) => {
      const { firstName, lastName, email } = request.body;
      const newUser = await fastify.db.user.create({
        data: {
          firstName,
          lastName,
          email,
        },
      });
      reply.status(201).send(newUser);
    }
  );

  fastify.get<{ Params: GetType }>(
    "/:email",
    {
      schema: {
        params: Get,
        response: {
          200: User,
        },
      },
    },
    async (request, reply) => {
      const { email } = request.params;
      const user = await fastify.db.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        reply.status(200).send(user);
      } else {
        reply.notFound("User not found");
      }
    }
  );

  fastify.delete<{ Params: GetType }>(
    "/:email",
    {
      schema: {
        params: Get,
        response: {
          200: {
            type: "boolean",
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = request.params;
      const user = await fastify.db.user.delete({
        where: {
          email,
        },
      });
      if (user) {
        reply.status(203).send(true);
      } else {
        reply.notFound("User not found");
      }
    }
  );

  fastify.patch<{ Params: GetType; Body: UpdateType }>(
    "/:email",
    {
      schema: {
        params: Get,
        body: Update,
        response: {
          200: User,
        },
      },
    },
    async (request, reply) => {
      const { email } = request.params;
      const { firstName, lastName } = request.body;
      const user = await fastify.db.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        reply.notFound("User not found");
      } else {
        const fname = firstName ?? user.firstName;
        const lname = lastName ?? user.lastName;
        const updated = await fastify.db.user.update({
          where: {
            email,
          },
          data: {
            firstName: fname,
            lastName: lname,
          },
        });
        reply.status(200).send(updated);
      }
    }
  );
};

export default users;

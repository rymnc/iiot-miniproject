import { FastifyPluginAsync } from "fastify";
import {
  User,
  UserType,
  Update,
  UpdateType,
  NewUser,
  NewUserType,
} from "./schemas";
import { hash } from "bcrypt";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return { users: true };
  });

  fastify.post<{ Body: UserType; Response: NewUserType }>(
    "/",
    {
      schema: {
        body: User,
        response: {
          201: NewUser,
        },
      },
    },
    async (request, reply) => {
      const { firstName, lastName, email, password } = request.body;
      const hashedPw = await hash(password, 10);
      const newUser = await fastify.db.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPw,
        },
      });
      await fastify.db.userActions.create({
        data: {
          table: 'User',
          type: 'CREATE',
          userId: newUser.id
        }
      })
      reply.status(201).send(newUser);
    }
  );

  fastify.get(
    "/data",
    {
      schema: {
        response: {
          200: NewUser,
        },
      },
    },
    async (request, reply) => {
      const { email } = await request.jwtVerify();
      const user = await fastify.db.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        await fastify.db.userActions.create({
          data: {
            table: 'User',
            type: 'READ',
            userId: user.id
          }
        })
        reply.status(200).send(user);
      } else {
        reply.notFound("User not found");
      }
    }
  );

  fastify.delete(
    "/delete",
    {
      schema: {
        response: {
          203: {
            type: "boolean",
          },
        },
      },
    },
    async (request, reply) => {
      const { email } = await request.jwtVerify();
      const user = await fastify.db.user.delete({
        where: {
          email,
        },
      });
      if (user) {
        await fastify.db.userActions.create({
          data: {
            table: 'User',
            type: 'DELETE',
            userId: user.id
          }
        })
        reply.status(203).send(true);
      } else {
        reply.notFound("User not found");
      }
    }
  );

  fastify.post<{ Body: UpdateType; Response: UpdateType }>(
    "/update",
    {
      schema: {
        body: Update,
        response: {
          200: NewUser,
        },
      },
    },
    async (request, reply) => {
      const { email } = await request.jwtVerify();
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
        fastify.log.info(updated);
        await fastify.db.userActions.create({
          data: {
            table: 'User',
            type: 'UPDATE',
            userId: user.id
          }
        })
        reply.status(200).send(updated);
      }
    }
  );
};

export default users;

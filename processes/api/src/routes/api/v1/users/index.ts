import { FastifyPluginAsync } from 'fastify'
import {
  User,
  UserType,
  Get,
} from './schemas'

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return { users: true }
  })

  fastify.post<{ Body: UserType; Response: UserType }>('/create', {
    schema: {
      body: User,
      response: {
        201: User
      },
    },
  },
    async (request, reply) => {
      const { firstName, lastName, email } = request.body;
      const newUser = await fastify.db.user.create({
        data: {
          firstName,
          lastName,
          email
        }
      })
      reply.status(201).send(newUser)
    })

  fastify.get<{Params: Get;}>('/:email', {
    schema: {
      // params: {
      //   email: String,
      // },
      response: {
        200: User,
      }
    },
  },
    async (request, reply) => {
      const {email} = request.params;
      const user = await fastify.db.user.findUnique({
        where: {
          email
        }
      })
      if(user) {
        reply.status(200).send(user)
      } else {
        reply.notFound()
      }
    })

    fastify.delete<{Params: Get;}>('/:email', {
      schema: {
        // params: {
        //   email: 'String',
        // },
        response: {
          200: {
            type: 'boolean',
          }
        }
      },
    },
      async (request, reply) => {
        const {email} = request.params;
        const user = await fastify.db.user.delete({
          where: {
            email
          }
        })
        if(user) {
          reply.status(203).send(true)
        } else {
          reply.notFound()
        }
      })
}

export default users;

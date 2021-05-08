import { FastifyPluginAsync } from 'fastify'
import {User, UserType} from './schemas'

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return { users: true }
  })

  fastify.post<{Body: UserType; Response: UserType}>('/create', {
      schema: {
        body: User,
        response: {
          201: User
        },
      },
    },
    async (request, reply) => {
        const {firstName, lastName, email} = request.body;
        const newUser = {
            firstName, lastName, email, isPremium: false,
        }
        return newUser
    })
}

export default users;
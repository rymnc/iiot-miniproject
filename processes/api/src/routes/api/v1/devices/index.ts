import { DeviceDetails } from "@prisma/client";
import { FastifyPluginAsync } from "fastify";
import {
    Device,
    DeviceType,
    NewDevice,
    NewDeviceType,
    Devices,
    Query,
    // Unsafe type
    QueryType,
    DeleteDevice,
    DeleteDeviceType
} from './schemas'
const devices: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/", async (request, reply) => {
        return { devices: true };
    });

    fastify.post<{ Body: DeviceType; Response: NewDeviceType }>('/new', {
        schema: {
            body: Device,
            response: {
                201: NewDevice
            }
        }
    },
        async (request, reply) => {
            const { email } = await request.jwtVerify()
            const { healthy, deviceName, deviceType } = request.body
            const user = await fastify.db.user.findUnique({
                where: {
                    email,
                },
            });
            if (user === null) {
                reply.notFound('User not found')
            } else {
                const device = await fastify.db.deviceDetails.create({
                    data: {
                        deviceName,
                        deviceType,
                        healthy,
                        userId: user.id
                    }
                })
                reply.status(201).send(device)
            }
        })

    fastify.get('/all', {
        schema: {
            response: {
                200: Devices
            }
        }
    }, async (request, reply) => {
        const { email } = await request.jwtVerify()
        const user = await fastify.db.user.findUnique({ where: { email } })
        if (user === null) {
            reply.notFound('User not found')
        } else {
            const devices = await fastify.db.deviceDetails.findMany({ where: { user } })
            reply.status(200).send(devices)
        }
    })

    // SQL Injection Surface. No Static Typing / No Input validation as well. 
    fastify.post<{ Body: QueryType; }>('/some', {
        schema: {
            body: Query
        }
    }, async (request, reply) => {
        const { where, columns } = request.body;
        const { email } = await request.jwtVerify()
        const user = await fastify.db.user.findUnique({ where: { email } })
        if (user === null) {
            reply.notFound('User not found')
        } else {
            const devices: Array<DeviceDetails> = await fastify.db.$queryRaw(`SELECT ` + columns + ` FROM "DeviceDetails" WHERE \"userId\"=${user.id} AND` + where)
            reply.status(200).send(devices)
        }


    })

    fastify.delete<{ Querystring: DeleteDeviceType }>('/delete', {
        schema: {
            querystring: DeleteDevice,
            response: {
                203: {
                    type: 'boolean'
                }
            }
        }
    }, async (request, reply) => {
        const { deviceId } = request.query;
        const { email } = await request.jwtVerify()
        const user = await fastify.db.user.findUnique({ where: { email } })
        if (user === null) {
            reply.notFound('User not found')
        } else {
            const device = await fastify.db.deviceDetails.findUnique({ where: { deviceId } })
            if (device === null) {
                reply.notFound('Device not found')
            } else {
                if (device.userId === user.id) {
                    await fastify.db.deviceDetails.delete({ where: { deviceId } })
                } else {
                    reply.unauthorized('You cannot delete this device!')
                }
            }
            reply.status(203).send(true)
        }


    })


}

export default devices;

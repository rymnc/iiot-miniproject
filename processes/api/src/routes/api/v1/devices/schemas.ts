import { DeviceTypes } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Device = Type.Object({
    deviceName: Type.String(),
    deviceType: Type.Enum(DeviceTypes),
    healthy: Type.Boolean(),
})
type DeviceType = Static<typeof Device>;

const NewDevice = Type.Object({
    deviceName: Type.String(),
    deviceType: Type.Enum(DeviceTypes),
    healthy: Type.Boolean(),
    deviceId: Type.String({ format: 'uuid' }),
    createdAt: Type.String({ format: "date-time" })
})
type NewDeviceType = Static<typeof NewDevice>;

const Devices = Type.Array(NewDevice)
type DevicesType = Static<typeof Devices>;

const Query = Type.Object({
    columns: Type.Array(Type.String()),
    where: Type.String()
})
type QueryType = Static<typeof Query>;

export {
    Device,
    DeviceType,
    NewDevice,
    NewDeviceType,
    Devices,
    DevicesType,
    Query,
    QueryType,
}
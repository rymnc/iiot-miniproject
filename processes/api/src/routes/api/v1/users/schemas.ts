import { Static, Type } from '@sinclair/typebox'

const User = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
});
type UserType = Static<typeof User>;

interface Get {
  email: string
}

export {
  UserType,
  User,
  Get,
}
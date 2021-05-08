import { Static, Type } from '@sinclair/typebox'

const User = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.Optional(Type.String({ format: "email" })),
});
type UserType = Static<typeof User>;

export {
    UserType,
    User,
}
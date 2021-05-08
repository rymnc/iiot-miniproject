import { Static, Type } from "@sinclair/typebox";

const User = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
});
type UserType = Static<typeof User>;

const Get = Type.Object({
  email: Type.String({ format: "email" }),
});
type GetType = Static<typeof Get>;

const Update = Type.Object({
  firstName: Type.Optional(Type.String()),
  lastName: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: "email" })),
});
type UpdateType = Static<typeof Update>;

export { UserType, User, Get, GetType, Update, UpdateType };

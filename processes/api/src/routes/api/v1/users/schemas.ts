import { Static, Type } from "@sinclair/typebox";

const User = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
});
type UserType = Static<typeof User>;

const NewUser = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ format: "email" }),
});
type NewUserType = Static<typeof NewUser>;

const Update = Type.Object({
  firstName: Type.Optional(Type.String()),
  lastName: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: "email" })),
});
type UpdateType = Static<typeof Update>;

export { UserType, User, Update, UpdateType, NewUser, NewUserType };

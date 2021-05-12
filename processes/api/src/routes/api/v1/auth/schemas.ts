import { Static, Type } from "@sinclair/typebox";

const Login = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String(),
});
type LoginType = Static<typeof Login>;

const LoginResponse = Type.Object({
  token: Type.String(),
});
type LoginResponseType = Static<typeof LoginResponse>;

export { Login, LoginType, LoginResponse, LoginResponseType };

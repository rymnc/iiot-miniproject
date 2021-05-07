require("dotenv").config();

module.exports = {
  development: {
    databaseURL: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
  test: {
    username: null,
    password: null,
    host: "localhost",
    dialect: "sqlite",
    storage: __dirname+'/data.sqlite3'
  },
  production: {
    databaseURL: process.env.DATABASE_URL,
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};

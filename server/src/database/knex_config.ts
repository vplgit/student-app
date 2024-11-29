require("dotenv").config();

export default {
  development: {
    client: "pg",
    //database connection parameters
    connection: {
      host: process.env.DB_HOST ?? "localhost",
      user: process.env.DB_USER ?? "postgres",
      password: process.env.DB_PASSWORD ?? "",
      database: process.env.DB_NAME ?? "Student",
      port: process.env.DB_PORT ?? 5432,
    },
    useNullAsDefault: true,
  },
};

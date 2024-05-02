require("dotenv").config();
export default {
  development: {
    client: "postgresql",
    //database connection parameters
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
    },
    useNullAsDefault: true, // Use NULL as default for missing values
  },
};

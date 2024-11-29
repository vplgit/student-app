import Knex from "knex";
import { migrationScript } from "./db_migration/migration";
import config from "./knex_config";

//knex instace creation
const knex:any = Knex(config.development);

//check if database is connected
knex.raw("SELECT 1").then(async () => {
  try {
    await migrationScript();
    console.log("[ PostgreSql connected. ]");
  } catch (error) {
    console.log("[ Failed to connect PostgreSql. ]");
    throw error;
  }
});
export { knex };

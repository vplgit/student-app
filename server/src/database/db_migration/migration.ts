import { knex } from "../knex";
import { tables } from "../tables";
export const migrationScript = async () => {
  try {
    let is_table_exists: boolean;
    is_table_exists = await knex.schema.hasTable(tables.API_LOG);

    //creatinf tables schema if tables does not exists
    if (!is_table_exists) {
      await knex.schema.createTable(tables.API_LOG, (table: any) => {
        table.increments();
        table.string("request_method");
        table.string("request_path");
        table.string("process_time");
        table.timestamps(true, true);
      });
    }
    //creatinf tables schema if tables does not exists
    is_table_exists = await knex.schema.hasTable(tables.USER_TABLE);
    if (!is_table_exists) {
      await knex.schema.createTable(tables.USER_TABLE, (table: any) => {
        table.increments();
        table.string("first_name");
        table.string("last_name");
        table.string("email");
        table.string("contact");
        table.integer("data_save");
        table.integer("data_update");
        table.timestamps(true, true);
      });
    }
  } catch (error) {
    console.log("Migration...error : ", error);
    throw error;
  }
};

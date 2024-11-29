import { knex } from "../knex";
import { tables } from "../tables";
export const migrationScript = async () => {
  try {
    let is_table_exists: boolean;
    is_table_exists = await knex.schema.hasTable(tables.STUDENT_TABLE);

    //creating tables schema if tables does not exists
    if (!is_table_exists) {
      await knex.schema.createTable(tables.STUDENT_TABLE, (table: any) => {
        table.increments("id").primary();
        table.string("first_name", 255).notNullable();
        table.string("last_name", 255).notNullable();
        table.string("email", 255).unique().notNullable();
        table.timestamps(true, true);
      });
    }
    //creating tables schema if tables does not exists
    is_table_exists = await knex.schema.hasTable(tables.MARKS_TABLE);
    if (!is_table_exists) {
      await knex.schema.createTable(tables.MARKS_TABLE, (table: any) => {
        table.increments("id").primary();
        table.integer("student_id").unsigned().notNullable();
        table.string("subject_name", 255).notNullable();
        table.integer("marks").notNullable();
        table.timestamps(true, true);
        table
          .foreign("student_id")
          .references("id")
          .inTable(tables.STUDENT_TABLE)
          .onDelete("CASCADE");
      });
    }
  } catch (error) {
    console.log("Migration...error : ", error);
    throw error;
  }
};

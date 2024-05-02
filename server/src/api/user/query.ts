import { knex } from "../../database/knex";
import { tables } from "../../database/tables";
import { User } from "./user.model";
import { utils } from "../../utils";
// Query class contains all functions for CRUD operation of User module
class Query {
  //Add new User in database
  saveModuleData = async (body: User) => {
    try {
      const result = await knex(tables.USER_TABLE).insert(body, [
        "id",
        "data_save",
      ]);

      await this.change_count(result, "data_save");

      return result;
    } catch (error) {
      throw error;
    }
  };
  //update existing record of database based on selective user
  updateModuleData = async (body: User) => {
    try {
      console.log("listing", body);
      const update_id = body.module_row_id;
      delete body.module_row_id;
      const result = await knex(tables.USER_TABLE)
        .update(body, ["id", "data_update"])
        .where("id", update_id);

      const res = await this.change_count(result, "data_update");
      console.log("rex:", res);
      return result;
    } catch (error) {
      //console.log("Error : ", error);
      throw error;
    }
  };

  //list all data of users
  getModuleList = async () => {
    try {
      const result = await knex(tables.USER_TABLE).select("*");
      return result;
    } catch (error) {
      throw error;
    }
  };

  getModuleUpdateSaveCountList = async () => {
    try {
      const post = await knex(tables.API_LOG)
        .count("id")
        .where("request_method", "POST");
      const put = await knex(tables.API_LOG)
        .count("id")
        .where("request_method", "PUT");
      return { post: post[0].count, put: put[0].count };
    } catch (error) {
      throw error;
    }
  };

  //common post and put request count to save in database
  change_count = async (result: any, type: string) => {
    if (utils.not_null_undef_empty(result)) {
      if (utils.not_null_undef_empty(result[0][type])) {
        await knex(tables.USER_TABLE)
          .update({ [type]: result[0][type] + 1 }, ["id"])
          .where("id", result[0].id);
      } else {
        await knex(tables.USER_TABLE)
          .update({ [type]: 1 }, ["id"])
          .where("id", result[0].id);
      }
    }
  };
}
export default new Query();

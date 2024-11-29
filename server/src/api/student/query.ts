import { knex } from "../../database/knex";
import { tables } from "../../database/tables";
import { Student } from "./student.model";
import { utils } from "../../utils";
// Query class contains all functions for CRUD operation of Student module
class Query {
  //Add new Student in database
  saveModuleData = async (body: Student) => {
    try {
      const result = await knex(tables.STUDENT_TABLE)
        .insert(
          {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
          },
          ["id"]
        )
        .then(async (data: any) => {
          if (data && data[0].id) {
            return await knex(tables.MARKS_TABLE).insert(
              {
                student_id: data[0].id,
                marks: body.marks,
                subject_name: body.subject_name,
              },
              ["id"]
            );
          }
        });
      return result;
    } catch (error) {
      throw error;
    }
  };

  //update existing record of database based on selective Student
  updateModuleData = async (id: number, body: Student) => {
    try {
      const result = await knex(tables.STUDENT_TABLE)
        .update(
          {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
          },
          ["id"]
        )
        .where("id", id)
        .then(async (data: any) => {
          if (data && data[0].id) {
            return await knex(tables.MARKS_TABLE)
              .update(
                {
                  student_id: data[0].id,
                  marks: body.marks,
                  subject_name: body.subject_name,
                },
                ["id"]
              )
              .where("student_id", id);
          }
        });
      return result;
    } catch (error) {
      //console.log("Error : ", error);
      throw error;
    }
  };

  //list all data of Students
  getModuleList = async (offset: number, limit: number) => {
    try {
      // Fetch students and total count
      const [students, totalRecords] = await Promise.all([
        knex(`${tables.STUDENT_TABLE} as st`)
          .select("st.*", "marks", "subject_name")
          .join(`${tables.MARKS_TABLE} as mt`, "mt.student_id", "st.id")
          .limit(limit)
          .offset(offset),
        knex(tables.STUDENT_TABLE).count("* as count").first(),
      ]);
      return { data: students, data_count: totalRecords.count };
    } catch (error) {
      throw error;
    }
  };

  getModuleListByParams = async (id: number, marks: number) => {
    try {
      console.log(id, marks);
      const result = await knex(`${tables.STUDENT_TABLE} as st`)
        .join(`${tables.MARKS_TABLE} as mt`, "mt.student_id", "st.id")
        .select("st.*", "marks", "subject_name")
        .where("st.id", id)
        .where("marks", marks);
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteModuleByParams = async (id: number) => {
    try {
      const result = await knex(tables.STUDENT_TABLE)
        .del(["id"])
        .where("id", id);
      return result;
    } catch (error) {
      throw error;
    }
  };
}
export default new Query();

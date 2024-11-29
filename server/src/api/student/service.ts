import { messages } from "../../common/messages";
import { status_codes } from "../../common/status_code";
import { Student } from "./student.model";
import { utils } from "../../utils";
import query from "./query";

//Service layer
class Service {
  saveModuleData = async (body: Student) => {
    try {
      const result = await query.saveModuleData(body);
      if (utils.not_null_undef_empty(result) && result.length != 0) {
        return {
          statusCode: status_codes.success,
          message: messages.record_saved,
          result: [],
        };
      } else {
        return {
          statusCode: status_codes.internalServerError,
          message: messages.internal_server_error,
          result: result,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  updateModuleData = async (id: number, body: Student) => {
    try {
      const result = await query.updateModuleData(id, body);
      if (utils.not_null_undef_empty(result) && result.length != 0) {
        return {
          statusCode: status_codes.success,
          message: messages.record_updated,
          result: [],
        };
      } else {
        return {
          statusCode: status_codes.internalServerError,
          message: messages.internal_server_error,
          result: result,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  getModuleList = async (offset: number, limit: number) => {
    try {
      const result = await query.getModuleList(offset, limit);
      if (result != undefined || null) {
        return {
          statusCode: status_codes.success,
          message: messages.success,
          result: result,
        };
      } else if (isNaN(offset) || isNaN(limit) || offset < 1 || limit < 1) {
        return {
          statusCode: 400,
          message: "Invalid pagination parameters",
          result: result,
        };
      }
      {
        return {
          statusCode: status_codes.internalServerError,
          message: messages.internal_server_error,
          result: result,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  getModuleListByParams = async (id: any, marks: any) => {
    try {
      const result = await query.getModuleListByParams(id, marks);
      if (result != undefined || null) {
        return {
          statusCode: status_codes.success,
          message: messages.success,
          result: result,
        };
      } else {
        return {
          statusCode: status_codes.internalServerError,
          message: messages.internal_server_error,
          result: result,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  deleteModuleByParams = async (id: number) => {
    try {
      const result = await query.deleteModuleByParams(id);
      if (result != undefined || null) {
        return {
          statusCode: status_codes.success,
          message: messages.dataDeleted,
          result: result,
        };
      } else {
        return {
          statusCode: status_codes.internalServerError,
          message: messages.internal_server_error,
          result: result,
        };
      }
    } catch (error) {
      throw error;
    }
  };
}
export default new Service();

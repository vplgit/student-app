import { messages } from "../../common/messages";
import { status_codes } from "../../common/status_code";
import { User } from "./user.model";
import { utils } from "../../utils";
import query from "./query";

//Service layer
class Service {
  saveModuleData = async (body: User) => {
    try {
      const result = await query.saveModuleData(body);
      if (utils.not_null_undef_empty(result) && result.length != 0) {
        return {
          statusCode: status_codes.success,
          message: messages.record_saved,
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

  updateModuleData = async (body: User) => {
    try {
      const result = await query.updateModuleData(body);
      if (utils.not_null_undef_empty(result) && result.length != 0) {
        return {
          statusCode: status_codes.success,
          message: messages.record_updated,
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

  getModuleList = async () => {
    try {
      const result = await query.getModuleList();
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

  getModuleUpdateSaveCountList = async () => {
    try {
      const result = await query.getModuleUpdateSaveCountList();
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
}
export default new Service();

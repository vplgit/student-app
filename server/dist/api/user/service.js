"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../common/messages");
const status_code_1 = require("../../common/status_code");
const utils_1 = require("../../utils");
const query_1 = __importDefault(require("./query"));
//Service layer
class Service {
    constructor() {
        this.saveModuleData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield query_1.default.saveModuleData(body);
                if (utils_1.utils.not_null_undef_empty(result) && result.length != 0) {
                    return {
                        statusCode: status_code_1.status_codes.success,
                        message: messages_1.messages.record_saved,
                        result: result,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.status_codes.internalServerError,
                        message: messages_1.messages.internal_server_error,
                        result: result,
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.updateModuleData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield query_1.default.updateModuleData(body);
                if (utils_1.utils.not_null_undef_empty(result) && result.length != 0) {
                    return {
                        statusCode: status_code_1.status_codes.success,
                        message: messages_1.messages.record_updated,
                        result: result,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.status_codes.internalServerError,
                        message: messages_1.messages.internal_server_error,
                        result: result,
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.getModuleList = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield query_1.default.getModuleList();
                if (result != undefined || null) {
                    return {
                        statusCode: status_code_1.status_codes.success,
                        message: messages_1.messages.success,
                        result: result,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.status_codes.internalServerError,
                        message: messages_1.messages.internal_server_error,
                        result: result,
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.getModuleUpdateSaveCountList = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield query_1.default.getModuleUpdateSaveCountList();
                console.log("Result : ", result);
                if (result != undefined || null) {
                    return {
                        statusCode: status_code_1.status_codes.success,
                        message: messages_1.messages.success,
                        result: result,
                    };
                }
                else {
                    return {
                        statusCode: status_code_1.status_codes.internalServerError,
                        message: messages_1.messages.internal_server_error,
                        result: result,
                    };
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Service();

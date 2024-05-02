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
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../../database/knex");
const tables_1 = require("../../database/tables");
const utils_1 = require("../../utils");
// Query class contains all functions for CRUD operation of User module
class Query {
    constructor() {
        //Add new User in database
        this.saveModuleData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, knex_1.knex)(tables_1.tables.USER_TABLE).insert(body, [
                    "id",
                    "data_save",
                ]);
                yield this.change_count(result, "data_save");
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        //update existing record of database based on selective user
        this.updateModuleData = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("listing", body);
                const update_id = body.module_row_id;
                delete body.module_row_id;
                const result = yield (0, knex_1.knex)(tables_1.tables.USER_TABLE)
                    .update(body, ["id", "data_update"])
                    .where("id", update_id);
                const res = yield this.change_count(result, "data_update");
                console.log("rex:", res);
                return result;
            }
            catch (error) {
                //console.log("Error : ", error);
                throw error;
            }
        });
        //list all data of users
        this.getModuleList = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, knex_1.knex)(tables_1.tables.USER_TABLE).select("*");
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        this.getModuleUpdateSaveCountList = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield (0, knex_1.knex)(tables_1.tables.API_LOG)
                    .count("id")
                    .where("request_method", "POST");
                const put = yield (0, knex_1.knex)(tables_1.tables.API_LOG)
                    .count("id")
                    .where("request_method", "PUT");
                return { post: post[0].count, put: put[0].count };
            }
            catch (error) {
                throw error;
            }
        });
        //common post and put request count to save in database
        this.change_count = (result, type) => __awaiter(this, void 0, void 0, function* () {
            if (utils_1.utils.not_null_undef_empty(result)) {
                if (utils_1.utils.not_null_undef_empty(result[0][type])) {
                    yield (0, knex_1.knex)(tables_1.tables.USER_TABLE)
                        .update({ [type]: result[0][type] + 1 }, ["id"])
                        .where("id", result[0].id);
                }
                else {
                    yield (0, knex_1.knex)(tables_1.tables.USER_TABLE)
                        .update({ [type]: 1 }, ["id"])
                        .where("id", result[0].id);
                }
            }
        });
    }
}
exports.default = new Query();

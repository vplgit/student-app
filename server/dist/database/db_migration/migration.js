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
exports.migrationScript = void 0;
const knex_1 = require("../knex");
const tables_1 = require("../tables");
const migrationScript = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let is_table_exists;
        is_table_exists = yield knex_1.knex.schema.hasTable(tables_1.tables.API_LOG);
        //creatinf tables schema if tables does not exists
        if (!is_table_exists) {
            yield knex_1.knex.schema.createTable(tables_1.tables.API_LOG, (table) => {
                table.increments();
                table.string("request_method");
                table.string("request_path");
                table.string("process_time");
                table.timestamps(true, true);
            });
        }
        //creatinf tables schema if tables does not exists
        is_table_exists = yield knex_1.knex.schema.hasTable(tables_1.tables.USER_TABLE);
        if (!is_table_exists) {
            yield knex_1.knex.schema.createTable(tables_1.tables.USER_TABLE, (table) => {
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
    }
    catch (error) {
        console.log("Migration...error : ", error);
        throw error;
    }
});
exports.migrationScript = migrationScript;

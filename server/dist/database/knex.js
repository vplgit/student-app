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
exports.knex = void 0;
const knex_1 = __importDefault(require("knex"));
const migration_1 = require("./db_migration/migration");
const knex_config_1 = __importDefault(require("./knex_config"));
//knex instace creation
const knex = (0, knex_1.default)(knex_config_1.default.development);
exports.knex = knex;
//check if database is connected
knex.raw("SELECT 1").then(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, migration_1.migrationScript)();
        console.log("[ PostgreSql connected. ]");
    }
    catch (error) {
        console.log("[ Failed to connect PostgreSql. ]");
        throw error;
    }
}));

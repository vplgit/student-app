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
exports.requestTimingMiddleware = void 0;
const knex_1 = require("../database/knex");
const tables_1 = require("../database/tables");
const messages_1 = require("../common/messages");
//Middleware for counting response time of any api
const requestTimingMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const start = Date.now();
        res.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
            const duration = Date.now() - start;
            console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
            yield (0, knex_1.knex)(tables_1.tables.API_LOG).insert({
                process_time: duration,
                request_path: req.path,
                request_method: req.method,
            });
        }));
        next();
    }
    catch (error) {
        res
            .status(error.statusCode || 500)
            .send({ error: error.message || messages_1.messages.internal_server_error });
    }
});
exports.requestTimingMiddleware = requestTimingMiddleware;

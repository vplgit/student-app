"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_response_time_1 = require("./middlewares/api_response_time");
const error_handler_1 = require("./middlewares/error_handler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(api_response_time_1.requestTimingMiddleware);
//base api route
app.use("/api/v1", require("./api"));
app.use(error_handler_1.error_handler);
//Start point of express server
app.listen(port, () => {
    try {
        console.log(`[ Server is running on port ${port} ]`);
    }
    catch (error) {
        console.log("Error : ", error);
    }
});

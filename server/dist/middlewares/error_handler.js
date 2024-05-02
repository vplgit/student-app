"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = void 0;
const messages_1 = require("../common/messages");
//Common error handler middleware
const error_handler = (err, req, res, next) => {
    var _a;
    console.log("Exception Error in Handler : ", (_a = err.messag) !== null && _a !== void 0 ? _a : err);
    res
        .status(err.statusCode || 500)
        .send({ error: err.message || messages_1.messages.internal_server_error });
};
exports.error_handler = error_handler;

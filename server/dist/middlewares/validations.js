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
exports.validateForm = void 0;
const user_model_1 = require("../api/user/user.model");
const messages_1 = require("../common/messages");
//Middleware for validating request payload
const validateForm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = user_model_1.userSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            res
                .status(400)
                .send({ error: error.message || messages_1.messages.internal_server_error });
        }
        else {
            next();
        }
    }
    catch (error) {
        res
            .status(error.statusCode || 500)
            .send({ error: error.message || messages_1.messages.internal_server_error });
    }
});
exports.validateForm = validateForm;

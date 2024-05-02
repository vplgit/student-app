"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    module_row_id: joi_1.default.number().optional().allow(""),
    first_name: joi_1.default.string().alphanum().min(3).max(30).required(),
    last_name: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    contact: joi_1.default.string()
        .regex(/^\d{10}$/)
        .required()
        .messages({
        "string.pattern.base": "Contact number must be a 10-digit number",
        "string.empty": "Contact number is required",
        "any.required": "Contact number is required",
    }),
    // You can add more properties and validation rules as needed
});

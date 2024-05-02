import Joi, { allow } from "joi";
export interface User {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  module_row_id?: number;
}

export const userSchema = Joi.object({
  module_row_id: Joi.number().optional().allow(""),
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  contact: Joi.string()
    .regex(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Contact number must be a 10-digit number",
      "string.empty": "Contact number is required",
      "any.required": "Contact number is required",
    }),
  // You can add more properties and validation rules as needed
});

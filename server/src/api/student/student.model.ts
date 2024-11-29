import Joi, { allow } from "joi";
export interface Student {
  student_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  marks: number;
  subject_name: string;
}

export const studentValidationSchema = Joi.object({
  first_name: Joi.string().max(255).required().messages({
    "string.base": "First name must be a string.",
    "string.max": "First name must be at most 255 characters long.",
    "any.required": "First name is required.",
  }),
  last_name: Joi.string().max(255).required().messages({
    "string.base": "Last name must be a string.",
    "string.max": "Last name must be at most 255 characters long.",
    "any.required": "Last name is required.",
  }),

  email: Joi.string().email().max(255).required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.max": "Email must be at most 255 characters long.",
    "any.required": "Email is required.",
  }),
  subject_name: Joi.string().max(255).required().messages({
    "string.base": "Subject name must be a string.",
    "string.max": "Subject name must be at most 255 characters long.",
    "any.required": "Subject name is required.",
  }),
  marks: Joi.number().integer().min(0).required().messages({
    "number.base": "Marks must be a number.",
    "number.integer": "Marks must be an integer.",
    "number.min": "Marks cannot be less than 0.",
    "any.required": "Marks are required.",
  }),
});

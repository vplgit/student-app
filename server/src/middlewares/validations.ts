import { studentValidationSchema } from "../api/student/student.model";
import { messages } from "../common/messages";

//Middleware for validating request payload
export const validateForm = async (req: any, res: any, next: any) => {
  try {
    const { error, value } = studentValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res
        .status(400)
        .send({ error: error.message || messages.internal_server_error });
    } else {
      next();
    }
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ error: error.message || messages.internal_server_error });
  }
};

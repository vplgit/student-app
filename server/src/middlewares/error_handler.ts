import { messages } from "../common/messages";
//Common error handler middleware
export const error_handler = (err: any, req: any, res: any, next: any) => {
  console.log("Exception Error in Handler : ", err.messag ?? err);
  res
    .status(err.statusCode || 500)
    .send({ error: err.message || messages.internal_server_error });
};

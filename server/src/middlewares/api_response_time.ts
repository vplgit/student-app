import { knex } from "../database/knex";
import { tables } from "../database/tables";
import { messages } from "../common/messages";
//Middleware for counting response time of any api
export const requestTimingMiddleware = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const start = Date.now();
    res.on("finish", async () => {
      const duration = Date.now() - start;
      console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
      await knex(tables.API_LOG).insert({
        process_time: duration,
        request_path: req.path,
        request_method: req.method,
      });
    });
    next();
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ error: error.message || messages.internal_server_error });
  }
};

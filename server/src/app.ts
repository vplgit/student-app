import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { knex } from "./database/knex";

import { requestTimingMiddleware } from "./middlewares/api_response_time";
import { error_handler } from "./middlewares/error_handler";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(requestTimingMiddleware);
//base api route
app.use("/api/v1", require("./api"));
app.use(error_handler);

//Start point of express server
app.listen(port, () => {
  try {
    console.log(`[ Server is running on port ${port} ]`);
  } catch (error) {
    console.log("Error : ", error);
  }
});

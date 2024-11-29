import express from "express";
const router = express.Router();
router.use("/student", require("./student/routes"));
module.exports = router;

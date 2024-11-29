import express from "express";
const router = express.Router();
import { Controller } from "./controller";
import { validateForm } from "../../middlewares/validations";

//all required api routes for user module
router.post("/", validateForm, Controller.saveModuleData);
router.put("/:id", validateForm, Controller.updateModuleData);
router.get("/:offset/:limit", Controller.getModuleList);
router.get("", Controller.getModuleListByParams);
router.delete("/:id", Controller.deleteModuleByParams);
module.exports = router;

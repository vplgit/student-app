import express from "express";
const router = express.Router();
import { Controller } from "./controller";
import { validateForm } from "../../middlewares/validations";

//all required api routes for user module
router.post("/save", validateForm, Controller.saveModuleData);
router.put("/update", validateForm, Controller.updateModuleData);
router.get("/list", Controller.getModuleList);
router.get("/update_save_count", Controller.getModuleUpdateSaveCountList);
module.exports = router;

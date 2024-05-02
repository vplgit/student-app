"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = require("./controller");
const validations_1 = require("../../middlewares/validations");
//all required api routes for user module
router.post("/save", validations_1.validateForm, controller_1.Controller.saveModuleData);
router.put("/update", validations_1.validateForm, controller_1.Controller.updateModuleData);
router.get("/list", controller_1.Controller.getModuleList);
router.get("/update_save_count", controller_1.Controller.getModuleUpdateSaveCountList);
module.exports = router;

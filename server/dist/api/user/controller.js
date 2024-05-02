"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const service_1 = __importDefault(require("./service"));
//Controller layer
exports.Controller = {
    saveModuleData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service_1.default.saveModuleData(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    updateModuleData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service_1.default.updateModuleData(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    getModuleList: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service_1.default.getModuleList();
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    getModuleUpdateSaveCountList: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service_1.default.getModuleUpdateSaveCountList();
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
};

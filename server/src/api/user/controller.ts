import { Request, Response, NextFunction } from "express";
import service from "./service";

//Controller layer
export const Controller = {
  saveModuleData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.saveModuleData(req.body);
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },

  updateModuleData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.updateModuleData(req.body);
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },

  getModuleList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getModuleList();
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },
  getModuleUpdateSaveCountList: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await service.getModuleUpdateSaveCountList();
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },
};

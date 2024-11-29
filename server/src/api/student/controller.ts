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
      const result = await service.updateModuleData(
        parseInt(req.params.id),
        req.body
      );
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },

  getModuleList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getModuleList(
        parseInt(req.params.offset),
        parseInt(req.params.limit)
      );
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },

  getModuleListByParams: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await service.getModuleListByParams(
        req.query.id,
        req.query.marks
      );
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },

  deleteModuleByParams: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await service.deleteModuleByParams(
        parseInt(req.params.id)
      );
      res.status(result.statusCode).send(result);
    } catch (error) {
      next(error);
    }
  },
};

import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/ErrorHandle";
import {
  addTrror,
  deadliestRegions,
  getAllTrrors,
  getTerrorEventsByBigCasualtiesService,
  getTerrorsByCall,
  groupsByYear,
  incidentTrends,
  topGroupsbyRegion,
  trrorsByRegionEndAggregate,
} from "../services/trrorService";

const router: IRouter = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const trror = await addTrror(req.body);
    res.status(201).json(trror);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const trrors = await getAllTrrors();
    res.status(201).json(trrors);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get(
  "/deadliest-attack-types",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const trrorsByAttacktype = await getTerrorEventsByBigCasualtiesService();
      res.status(201).json(trrorsByAttacktype);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/highest-casualty-regions",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const trrors = await trrorsByRegionEndAggregate();
      res.status(201).json(trrors);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/incident-trends",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const start = parseInt(req.query.start as string);
      const end = parseInt(req.query.end as string);

      const trrors = await incidentTrends(start, end);
      res.status(201).json(trrors);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/top-groups",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const region = req.query.region as string;

      const trrors = await topGroupsbyRegion(region);
      res.status(201).json(trrors);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/groups-by-year",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const iyear = parseInt(req.query.iyear as string);
      const trrors = await groupsByYear(iyear);
      res.status(201).json(trrors);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/deadliest-regions",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const nameGroup = req.query.nameGroup as string;
      const trrors = await deadliestRegions(nameGroup);
      res.status(201).json(trrors);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

router.get(
  "/getTrrorsByCall",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);

      const terrorsByCall = await getTerrorsByCall(page, limit);
      res.json(terrorsByCall);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);

export default router;

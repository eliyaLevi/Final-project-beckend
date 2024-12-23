import express, { IRouter, Request, Response } from "express";
import usersContoller from "../src/controllers/usersController";
import trrorContoller from "../src/controllers/trrorController";
import authController from "../src/controllers/authController";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/users", usersContoller);
router.use("/terror", trrorContoller);
router.use("/auth", authController);

// router.use("/admin-role", verifyAdmin as NextFunction, dataContoller);

router.use((req: Request, res: Response) => {
  handleError(res, 404, "Miki is not found at Nimrodi Tower");
});

export default router;

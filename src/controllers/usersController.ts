import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/ErrorHandle";
import {
  addUser,
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  getUsersByCall,
} from "../services/UsersServices";

const router: IRouter = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(201).json(users);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
router.get(
  "/getUsersByCall",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);

      const usersByCall = await getUsersByCall(page, limit);
      res.json(usersByCall);
    } catch (error: any) {
      handleError(res, error.status || 404, error.message);
    }
  }
);
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserById(req.params.id);
    res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await patchUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    res.json(deletedUser);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;

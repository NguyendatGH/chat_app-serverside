import express from "express";
import { PrismaClient } from "@prisma/client";
import UserController from "../controllers/user";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();
const prisma = new PrismaClient();
const userController = new UserController(prisma);

router.get("/user", verifyToken, (req, res) =>
  userController.getUser(req, res)
);
router.get("/user/all", (req, res) => userController.getAll(req, res));
router.delete("/user/all", (req, res) => userController.deleteAll(req, res));

export default router;

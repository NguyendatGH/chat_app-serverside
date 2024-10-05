import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedUser } from "../interfaces";
import { generic500Error } from "../utils/constants";

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const bearerToken = req.headers["authorization"];

    if (!bearerToken) {
      res.status(403).json({ message: "No token provided" });
      return;
    }

    const bearer = bearerToken.split(" ");
    const token = bearer[1];

    if (!jwtSecret) {
      res.status(500).json({ message: "Could not find app secret" });
      return;
    }

    jwt.verify(token, jwtSecret, (error, decodedUser) => {
      if (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
      }

      req.user = decodedUser as DecodedUser;
      next();
    });
  } catch (error) {
    generic500Error(res, error);
  }
};

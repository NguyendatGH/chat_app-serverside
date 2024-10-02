import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DecodedUser } from "../interfaces";
import { generic500Error } from "../utils/constants";

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers["authorization"];
      if (!bearerToken) {
        return res.status(403).json({ message: "no token provided" });
      }

      const bearer = bearerToken.split(" ");
      const token = bearer[1];

      if (!jwtSecret) {
        return res.status(500).json({ message: "could not find app secret " });
      }
      await jwt.verify(token, jwtSecret, (error, decodeduser) => {
        if (error) {
          return res.status(403).json({ message: "invalid token" });
        }

        req.user = decodeduser as DecodedUser;
        next();
      });
    } catch (error) {
      return generic500Error(res, error);
    }
  };

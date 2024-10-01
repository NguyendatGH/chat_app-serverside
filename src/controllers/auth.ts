import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generic500Error } from "../utils/constants";

const jwtSecret = process.env.JWT_SECRET;

class AuthController {
  constructor(private prisma: PrismaClient) {}

  async login(req: Request, res: Response) {
    try {
        return
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async register(req: Request, res: Response) {
    try {
      return
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async logout(req: Request, res: Response) {
    try {
      return
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async hashPassWord() {}
  async generateJwt() {}
  async comparePassWords() {}

  generateRandomAvatar() {}
}

export default AuthController;
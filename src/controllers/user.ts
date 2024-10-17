import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class UserController {
  constructor(private prisma: PrismaClient) {}

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const foundUser = await this.prisma.user.findUnique({
        where: { id: +id },
        select: { id: true, username: true, photo: true, contacts: true },
      });
      if (!foundUser) {
        res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user: foundUser });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, username: true, photo: true },
      });
      res.status(200).json({ users });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  }

  async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      await this.prisma.user.deleteMany();
      res.status(200).json({ message: "All the users deleted" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  }
}

export default UserController;

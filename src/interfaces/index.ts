declare global {
  namespace Express {
    export interface Request {
      user?: DecodedUser;
    }
  }
}

import { Request } from "express";
export interface DecodedUser {
  id: number;
  username: string;
}

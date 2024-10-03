import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { generic500Error } from "../utils/constants";

export const validate =
  (schema: ObjectSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req.body)
      .then(() => next())
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        } else {
          return generic500Error(res, error);
        }
      });
  };

import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../schemas/User";
import { generateError, handleErrorMessage } from "./function";

dotenv.config();

const authenticate = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw generateError("UnAuthorized User", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
      userId: string;
    };
    if (decoded) {
      const user = await User.findById(decoded.userId);
      if (user) {
        const { password, ...userData } = user.toObject();
        req.userId = decoded.userId;
        req.bodyData = userData;
        next();
      } else {
        throw generateError("UnAuthorized User", 401);
      }
    } else {
      throw generateError("UnAuthorized User", 401);
    }
  } catch (err: any) {
    const error = generateError(`Authentication Error: ${err.message}`, 401);
    const errorMessage = await handleErrorMessage(
      error.message,
      error.data,
      error.statusCode,
      false
    );
    return res.status(error.statusCode).json(errorMessage);
  }
};

export default authenticate;

import { NextFunction, Request, Response } from "express";
import { status } from "http-status";

/**
 * @description 
 * This middleware function handles uncaught errors that occur during request processing. 
 * It logs the error stack to the console for debugging purposes and sends a generic 
 * 500 Internal Server Error response to the client.

 * @param {Error} err - The error object thrown during request handling.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware in the chain.
 */

export function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
};
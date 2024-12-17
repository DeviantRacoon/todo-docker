import { Request, Response, NextFunction } from "express";

export function customErrorHandler(
  message: string,
  statusCode: number = 500
): never {
  throw { message, statusCode };
}

export function requestHandler(
  fn: (req: Request, res: Response, next: NextFunction) => any
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      if (data !== undefined) {
        res.status(200).json({ ok: true, data });
      }
    } catch (error: any) {
      if (error.message && error.statusCode) {
        res.status(error.statusCode).json({ ok: false, message: error.message });
      } else {
        console.error("Error capturado:", error);
        res.status(500).json({ ok: false });
      }
    }
  };
}

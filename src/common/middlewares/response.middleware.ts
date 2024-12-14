import express from 'express';

export default function responseMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const originalJson = res.json;

  res.json = function (body: any): express.Response {
    if (res.statusCode === 500) {
      body = {
        ok: false,
        message: "Lo sentimos, ha ocurrido un error, nuestro equipo lo esta trabajando. Por favor, intente mas tarde.",
      };
    } else if (body && body.message) {
      body = {
        ok: true,
        ...body,
      };
    }
    return originalJson.call(this, body);
  };

  next();
}


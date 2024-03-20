import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

type RequestPart = 'body';

interface Schemas {
  body?: Schema;
};

export default (schemas: Schemas) =>
  async function validatorMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      for (const [key, schema] of Object.entries(schemas)) {
        const valueToValidate = req[key as RequestPart];

        const { error } = schema.validate(valueToValidate);

        if (error) {
          return res.status(400).json({ error: error.details });
        }
      }
      next();
    } catch (err) {
      const message = (err as { message?: string }).message ?? 'Internal Server Error';
      return res.status(500).json({ error: 'Internal Server Error', details: message });
    }
  };

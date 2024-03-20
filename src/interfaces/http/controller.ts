import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, request, response } from 'inversify-express-utils';
import { Logger } from 'winston';

import RegistryUsecase from 'src/app/usecases/registry_usecase';
import SchemaValidatorMiddleware from './middlewares/schema_validator_middleware';
import { RegistryCreationSchema } from './schemas/creation_schema';

@controller('/api')
export class Controller implements interfaces.Controller {
  constructor(
    @inject('RegistryUsecase') private registryUsecase: RegistryUsecase,
    @inject('Logger') private logger: Logger
  ) { }

  @httpPost('/registry', SchemaValidatorMiddleware({ body: RegistryCreationSchema }))
  public async create(@request() req: Request, @response() res: Response) {
    const callName = `[${this.constructor.name}][create]`;
    try {
      const { body } = req;
      this.logger.info(`${callName} - Request received`, body);
      const response = await this.registryUsecase.execute(body);
      return res.status(201).json({ message: 'Created', details: [{ uuid: response.uuid }] });
    } catch (error) {
      this.logger.error(`${callName} - Error`, error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

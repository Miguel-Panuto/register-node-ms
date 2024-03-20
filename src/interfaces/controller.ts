import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, request, response } from 'inversify-express-utils';
import RegistryUsecase from 'src/app/usecases/registry_usecase';
import { Logger } from 'winston';

@controller('/api')
export class Controller implements interfaces.Controller {
  constructor(
    @inject('RegistryUsecase') private registryUsecase: RegistryUsecase,
    @inject('Logger') private logger: Logger
  ) { }

  @httpPost('/registry')
  private async create(@request() req: Request, @response() res: Response): Promise<void> {
    const callName = `[${this.constructor.name}][create]`;
    try {
      const { body } = req;
      this.logger.info(`${callName} - Request: ${JSON.stringify(body)}`);
      this.registryUsecase.execute(body);
      res.status(201).json({ message: 'Created' });

    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}

import { inject, injectable } from 'inversify';
import RegistryRepository from 'src/infra/database/repositories/registry_repository';
import { Logger } from 'winston';

@injectable()
export default class RegistryUsecase {
  constructor(
    @inject('RegistryRepository') private registryRepository: RegistryRepository,
    @inject('Logger') private logger: Logger
  ) { }

  execute(data: any) {
    const callName = `[${this.constructor.name}][execute]`;
    this.logger.info(`${callName} just entered with`, { data });
  }
}

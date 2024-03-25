import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { v4 } from 'uuid';

import RegistryRepository from 'src/infra/database/repositories/registry_repository';

import Registry, { BaseRegistry, DatabaseRegistry } from 'src/@types/modules/registry';
import RegistryEntity from 'src/domain/registry_entity';

@injectable()
export default class RegistryUsecase {
  constructor(
    @inject('RegistryRepository') private registryRepository: RegistryRepository,
    @inject('Logger') private logger: Logger
  ) { }

  execute(data: Registry) {
    const callName = `[${this.constructor.name}][execute]`;
    this.logger.info(`${callName} just entered with`, data);

    const registryEntity = new RegistryEntity(data);
    return this.registryRepository.create({
      registry: registryEntity.registry,
      address: registryEntity.address,
      contact: registryEntity.contact,
    });
  }
}

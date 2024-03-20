import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { v4 } from 'uuid';

import RegistryRepository from 'src/infra/database/repositories/registry_repository';

import Registry, { BaseRegistry, DatabaseRegistry } from 'src/@types/modules/registry';

@injectable()
export default class RegistryUsecase {
  constructor(
    @inject('RegistryRepository') private registryRepository: RegistryRepository,
    @inject('Logger') private logger: Logger
  ) { }

  private static createEntities(data: Registry): DatabaseRegistry {
    const baseRegistry: BaseRegistry = {
      name: data.name,
      type: data.type,
      cpf: data.cpf.replace('.', '').replace('-', ''),
      uuid: v4(),
    };

    if (typeof (data.type) !== 'string') {
      throw new Error('Invalid type');
    }

    if (data.type === 'legal') {
      if (!data.cnpj) throw new Error('CNPJ not defined');
      baseRegistry.cnpj = data.cnpj!.replace('.', '').replace('/', '').replace('-', '');
    }

    return {
      registry: baseRegistry,
      address: { ...data.address, number: data.address.number.toString() },
      contact: {
        email: data.contact.email,
        cellphone: data.contact.cellphone,
        telephone: data.contact.telephone,
      },
    };
  }

  execute(data: Registry) {
    const callName = `[${this.constructor.name}][execute]`;
    this.logger.info(`${callName} just entered with`, data);

    const entities = RegistryUsecase.createEntities(data);
    return this.registryRepository.create(entities);
  }
}

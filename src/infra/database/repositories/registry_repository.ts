import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

import DatabaseClient from '../database_client';
import { DatabaseRegistry } from 'src/@types/modules/registry';

@injectable()
export default class RegistryRepository {
  private _client: PrismaClient;

  constructor(
    @inject('DatabaseClient') databaseClient: DatabaseClient,
    @inject('Logger') private logger: Logger
  ) {
    this._client = databaseClient.client;
  }

  create(data: DatabaseRegistry) {
    const callName = `[${this.constructor.name}][create]`;
    this.logger.info(`${callName} just entered with`);
    return this._client.registry.create({
      data: {
        ...data.registry,
        Contact: {
          create: data.contact,
        },
        Address: {
          create: data.address,
        },
      },
    });
  }
}

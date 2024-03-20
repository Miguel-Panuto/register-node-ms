import 'reflect-metadata';

import { Container } from 'inversify';
import RegistryUsecase from './app/usecases/registry_usecase';
import DatabaseClient from './infra/database/database_client';
import RegistryRepository from './infra/database/repositories/registry_repository';

import './interfaces/http/controller';
import logger from './utils/logger';
import { Logger } from 'winston';

export const container = new Container();

// Infra
container.bind<DatabaseClient>('DatabaseClient').to(DatabaseClient).inSingletonScope();
container.bind<RegistryRepository>('RegistryRepository').to(RegistryRepository).inRequestScope();

// App
container.bind<RegistryUsecase>('RegistryUsecase').to(RegistryUsecase).inRequestScope();

// Shared
container.bind<Logger>('Logger').toConstantValue(logger);


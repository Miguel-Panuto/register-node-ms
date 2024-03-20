import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import DatabaseClient from '../database_client';

@injectable()
export default class RegistryRepository {
    private _client: PrismaClient;

    constructor(@inject('DatabaseClient') databaseClient: DatabaseClient) {
        this._client = databaseClient.client;
    }

    public get client(): PrismaClient {
        return this._client;
    }
}

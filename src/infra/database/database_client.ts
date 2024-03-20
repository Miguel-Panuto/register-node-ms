import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export default class DatabaseClient {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  public get client(): PrismaClient {
    return this._client;
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const registry_repository_1 = __importDefault(require("src/infra/database/repositories/registry_repository"));
describe('RegistryRepository', () => {
    describe('create', () => {
        it('should entry a new registry in repository', async () => {
            const sandbox = (0, sinon_1.createSandbox)();
            const databaseClient = {
                client: {
                    registry: {
                        create: sandbox.stub().resolves({ uuid: '1234' }),
                    },
                },
            };
            const logger = {
                info: sandbox.stub(),
            };
            const repository = new registry_repository_1.default(databaseClient, logger);
            const res = await repository.create({
                registry: {
                    name: 'John Doe',
                    type: 'legal',
                    cpf: '12345678900',
                    cnpj: '12345678900000',
                    uuid: '1234',
                },
                address: {
                    street: 'Rua A',
                    number: '123',
                    complement: 'Casa',
                    city: 'Cidade A',
                    state: 'Estado A',
                    zipCode: '12345678',
                    neighborhood: 'Bairro A',
                },
                contact: {
                    email: '',
                    cellphone: '',
                    telephone: '',
                }
            });
            (0, chai_1.expect)(res).to.eql({ uuid: '1234' });
        });
    });
});

import { expect } from 'chai';
import { createSandbox } from 'sinon';

import RegistryRepository from 'src/infra/database/repositories/registry_repository';

describe('RegistryRepository', () => {
  describe('create', () => {
    it('should entry a new registry in repository', async () => {
      const sandbox = createSandbox();
      const databaseClient = {
        client: {
          registry: {
            create: sandbox.stub().resolves({ uuid: '1234' }),
          },
        },
      } as any;

      const logger = {
        info: sandbox.stub(),
      } as any;

      const repository = new RegistryRepository(databaseClient, logger);
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
      expect(res).to.eql({ uuid: '1234' });
    });
  });
});

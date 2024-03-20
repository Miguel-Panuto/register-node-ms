import RegistryUsecase from "src/app/usecases/registry_usecase";
const uuid = require('uuid');

import { expect } from 'chai';
import { assert, createSandbox } from 'sinon';

describe('RegistryUsecase', () => {
  it('should create a new registry', async () => {
    const sandbox = createSandbox();

    const registryRepository = {
      create: sandbox.stub().resolves({ uuid: '1234' }),
    } as any;

    const logger = {
      info: sandbox.stub(),
    } as any;

    const registryUsecase = new RegistryUsecase(registryRepository, logger);
    const data = {
      name: 'John Doe',
      type: 'legal',
      cpf: '12345678900',
      cnpj: '12345678900000',
      address: {
        street: 'Rua A',
        number: 123,
        complement: 'Casa',
        city: 'Cidade A',
        state: 'Estado A',
        zipCode: '12345678',
        neighborhood: 'Bairro A',
      },
      contact: {
        email: 'email@email.com',
        cellphone: '123456789',
        telephone: '123456789',
      },
    }
    const response = await registryUsecase.execute(data);
    expect(response).to.eql({ uuid: '1234' });
    assert.calledWith(logger.info, '[RegistryUsecase][execute] just entered with', data);
    assert.calledOnce(registryRepository.create);
  });

  it('should create a new without complement and cnpj registry', async () => {
    const sandbox = createSandbox();

    const registryRepository = {
      create: sandbox.stub().resolves({ uuid: '1234' }),
    } as any;

    const logger = {
      info: sandbox.stub(),
    } as any;

    const registryUsecase = new RegistryUsecase(registryRepository, logger);
    const data = {
      name: 'John Doe',
      type: 'natural',
      cpf: '123.456.789-00',
      address: {
        street: 'Rua A',
        number: 123,
        city: 'Cidade A',
        state: 'Estado A',
        zipCode: '12345678',
        neighborhood: 'Bairro A',
      },
      contact: {
        email: 'email@email.com',
        cellphone: '123456789',
        telephone: '123456789',
      },
    }
    const response = await registryUsecase.execute(data);
    expect(response).to.eql({ uuid: '1234' });
    assert.calledWith(logger.info, '[RegistryUsecase][execute] just entered with', data);
  });

  it('should create a new without complement and cnpj registry', async () => {
    const sandbox = createSandbox();

    const registryRepository = {
      create: sandbox.stub().resolves({ uuid: '1234' }),
    } as any;

    const logger = {
      info: sandbox.stub(),
    } as any;

    const registryUsecase = new RegistryUsecase(registryRepository, logger);
    try {
      await registryUsecase.execute(undefined as any);
    } catch (error: any) {
      expect(error.message).to.eql('Cannot read properties of undefined (reading \'name\')');
    }
  });

  it('should create a new without complement and cnpj registry', async () => {
    const sandbox = createSandbox();

    const registryRepository = {
      create: sandbox.stub().resolves({ uuid: '1234' }),
    } as any;

    const logger = {
      info: sandbox.stub(),
    } as any;

    const registryUsecase = new RegistryUsecase(registryRepository, logger);

    try {
      const res = await registryUsecase.execute({
        name: 'John Doe',
        type: true,
        cpf: '12345678900',
        cnpj: '12345678900000',
        address: {
          street: 'Rua A',
          number: 123,
          city: 'Cidade A',
          state: 'Estado A',
          zipCode: '12345678',
          neighborhood: 'Bairro A',
        },
        contact: {
          email: 'email@email.com',
          telephone: '123456789',
          cellphone: '123456789',
        }
      } as any);
    } catch (error: any) {
      expect(error.message).to.eql('Invalid type');
    }
  });
});

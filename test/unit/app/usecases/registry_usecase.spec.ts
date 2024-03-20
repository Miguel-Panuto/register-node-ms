import RegistryUsecase from "src/app/usecases/registry_usecase";

import { expect } from 'chai';
import { createSandbox } from 'sinon';

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
    const response = await registryUsecase.execute({
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
    });
    expect(response).to.eql({ uuid: '1234' });
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
    const response = await registryUsecase.execute({
      name: 'John Doe',
      type: 'natural',
      cpf: '12345678900',
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
    });
    expect(response).to.eql({ uuid: '1234' });
  });
});

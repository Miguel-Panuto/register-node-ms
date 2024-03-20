import { Controller } from 'src/interfaces/http/controller';

import { expect } from 'chai';
import { createSandbox } from 'sinon';

describe('Controller', () => {
  describe('create', () => {
    it('should entry a new registry in controller', async () => {
      const sandbox = createSandbox();
      const registryUsecase = {
        execute: sandbox.stub().resolves({ uuid: '1234' }),
      } as any;

      const logger = {
        info: sandbox.stub(),
      } as any;

      const req = {
        body: {
          name: 'John Doe',
          email: ''
        },
      } as any;

      const res = {
        status: sandbox.stub().returnsThis(),
        json: (data: any) => Promise.resolve(data),
      } as any;

      const controller = new Controller(registryUsecase, logger);
      const response = await controller.create(req, res);
      expect(response).to.eql({ message: 'Created', details: [{ uuid: '1234' }] });
    });
    it('should throw a error new registry in controller', async () => {
      const sandbox = createSandbox();
      const registryUsecase = {
        execute: sandbox.stub().throws(new Error('Error')),
      } as any;

      const logger = {
        info: sandbox.stub(),
        error: sandbox.stub(),
      } as any;

      const req = {
        body: {
          name: 'John Doe',
          email: ''
        },
      } as any;

      const res = {
        status: sandbox.stub().returnsThis(),
        json: (data: any) => Promise.resolve(data),
      } as any;

      const controller = new Controller(registryUsecase, logger);
      const response = await controller.create(req, res);
      expect(response).to.eql({ message: 'Internal Server Error' });
    });
  });
});

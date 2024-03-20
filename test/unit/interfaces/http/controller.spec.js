"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("src/interfaces/http/controller");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('Controller', () => {
    describe('create', () => {
        it('should entry a new registry in controller', async () => {
            const sandbox = (0, sinon_1.createSandbox)();
            const registryUsecase = {
                execute: sandbox.stub().resolves({ uuid: '1234' }),
            };
            const logger = {
                info: sandbox.stub(),
            };
            const req = {
                body: {
                    name: 'John Doe',
                    email: ''
                },
            };
            const res = {
                status: sandbox.stub().returnsThis(),
                json: (data) => Promise.resolve(data),
            };
            const controller = new controller_1.Controller(registryUsecase, logger);
            const response = await controller.create(req, res);
            (0, chai_1.expect)(response).to.eql({ message: 'Created', details: [{ uuid: '1234' }] });
        });
        it('should throw a error new registry in controller', async () => {
            const sandbox = (0, sinon_1.createSandbox)();
            const registryUsecase = {
                execute: sandbox.stub().throws(new Error('Error')),
            };
            const logger = {
                info: sandbox.stub(),
                error: sandbox.stub(),
            };
            const req = {
                body: {
                    name: 'John Doe',
                    email: ''
                },
            };
            const res = {
                status: sandbox.stub().returnsThis(),
                json: (data) => Promise.resolve(data),
            };
            const controller = new controller_1.Controller(registryUsecase, logger);
            const response = await controller.create(req, res);
            (0, chai_1.expect)(response).to.eql({ message: 'Internal Server Error' });
        });
    });
});

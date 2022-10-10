import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/Car.Model';
import CarService from '../../../services/Car.Service';
import CarController from '../../../controllers/Car.Controller';
import { mockCar, mockCarId, mockCars } from '../../mocks';

describe('Testes CarController', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);

  const req = {} as Request;
  const res = {} as Response;

  describe('Método "create"', () => {
    beforeEach(() => {
      sinon.stub(service, 'create').resolves(mockCarId);

      req.body = mockCar;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica status 201 e o objeto criado', async () => {
      await controller.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCarId)).to.be.true;
    });
  });

  describe('Método "read"', () => {
    beforeEach(() => {
      sinon.stub(service, 'read').resolves(mockCars);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    afterEach(sinon.restore);

    it('Verifica se o status 200 é retornado corretamente', async () => {
      await controller.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCars)).to.be.true;
    });
  });
});
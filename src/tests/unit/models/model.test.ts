import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.Model';
import { mockCar, mockCarId, mockCars } from '../../mocks';

describe('Testes CarModel', () => {
  const model = new CarModel();

  describe('Método "create"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(mockCarId);
    });

    afterEach(sinon.restore);

    it('Verifica se o objeto criado é retornado corretamente', async () => {
      const car = await model.create(mockCar);

      expect(car).to.be.deep.equal(mockCarId);
    });
  });

  describe('Método "read"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'find').resolves(mockCars);
    });

    afterEach(sinon.restore);

    it('Verifica se um array de carros é retornado corretamente.', async () => {
      const cars = await model.read();

      expect(cars).to.be.an('array');
      expect(cars.length).to.be.equal(2);
    });
  });
});
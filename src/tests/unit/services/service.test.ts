import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.Model';
import CarService from '../../../services/Car.Service';
import { ICar } from '../../../interfaces/ICar';
import { mockCar, mockCarId } from '../../mocks';

describe('Testes CarService', () => {
  const model = new CarModel();
  const service = new CarService(model);

  describe('Método "create"', () => {
    beforeEach(() => {
      sinon.stub(model, 'create').resolves(mockCarId);
    });

    afterEach(sinon.restore);

    it('Verifica se o objeto criado é retornado corretamente', async () => {
      const car = await service.create(mockCar);
      console.log(car);
      
      expect(car).to.be.deep.equal(mockCarId);
    });

    it('Verifica erro caso o objeto incorreto', async () => {
      try {
        await service.create({} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });
});
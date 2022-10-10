import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car.Model';
import CarService from '../../../services/Car.Service';
import { ICar } from '../../../interfaces/ICar';
import { mockCar, mockCarId, mockCars, mockCarUpdated } from '../../mocks';

describe('Testes CarService', () => {
  const model = new CarModel();
  const service = new CarService(model);

  const id = 'invalid';
  const message = 'Object not found';

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

  describe('Método "read"', () => {
    beforeEach(() => {
      sinon.stub(model, 'read').resolves(mockCars);
    });

    afterEach(sinon.restore);

    it('Verifica se um array de carros é retornado corretamente.', async () => {
      const cars = await service.read();

      expect(cars).to.be.an('array');
      expect(cars.length).to.be.equal(2);
    });
  });

  describe('Método "readOne"', () => {
    beforeEach(() => {
      sinon.stub(model, 'readOne')
        .onCall(0).resolves(mockCarId)
        .withArgs(id).resolves(null);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro correto é retornado ao informar uma Id válida', async () => {
      const car = await service.readOne(mockCarId._id);

      expect(car).to.be.deep.equal(mockCarId);
    });

    it('Verifica se um erro é lançado caso a id informada não seja encontrada', async () => {
      try {
        await service.readOne(id);
      } catch (e: any) {
        expect(e.code).to.be.equal(404);
        expect(e.message).to.be.deep.equal(message);
      }
    });
  });

  describe('Método "update"', () => {
    beforeEach(() => {
      sinon.stub(model, 'update')
        .onCall(0).resolves(mockCarUpdated)
        .withArgs(id, mockCarUpdated).resolves(null);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro atualizado é retornado corretamente', async () => {
      const _id = mockCarUpdated._id;
      const car = await service.update(_id, mockCarUpdated);

      expect(car).to.be.deep.equal(mockCarUpdated);
    });

    it('Verifica erro caso id informado não seja encontrada', async () => {
      try {
        await service.update(id, mockCarUpdated);
      } catch (e: any) {
        expect(e.code).to.be.equal(404);
        expect(e.message).to.be.deep.equal(message);        
      }
    });

    it('Verifica erro caso o objeto incorreto', async () => {
      const _id = mockCarUpdated._id;

      try {
        await service.update(_id, {} as ICar);
      } catch (e: any) {
        expect(e).to.be.instanceOf(ZodError);
      }
    });
  });
});
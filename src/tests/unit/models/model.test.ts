import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.Model';
import { ICar } from '../../../interfaces/ICar';
import { mockCar, mockCarId, mockCars, mockCarUpdated } from '../../mocks';

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
  
  describe('Método "readOne"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(mockCarId);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro correto é retornado ao informar uma Id válida', async () => {
      const id = mockCarId._id;
      const car = await model.readOne(id);

      expect(car).to.be.an('object');
      expect(Object.keys(car as ICar)).to.have.length(9);
    });

    it('Verifica se um erro é lançado caso a id informada seja inválida', async () => {
      try {
        await model.readOne('iderrado');
      } catch (e: any) {
        expect(e.code).to.be.equal(400);
      }
    });
  });

  describe('Método "update"', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(mockCarUpdated);
    });

    afterEach(sinon.restore);

    it('Verifica se o carro atualizado é retornado corretamente', async () => {
      const id = mockCarUpdated._id;
      const car = await model.update(id, mockCarUpdated);

      expect(car).to.be.deep.equal(mockCarUpdated);
    });

    it('Verifica se um erro é lançado caso a id informada seja inválida', async () => {
      try {
        await model.update('iderrado', mockCarUpdated);
      } catch (e: any) {
        expect(e.code).to.be.equal(400);
      }
    });
  })
});
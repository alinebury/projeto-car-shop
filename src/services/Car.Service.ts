import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class CarService implements IService<ICar> {
  constructor(private _car: IModel<ICar>) {}

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();

    return cars;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);
    console.log(car);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }
}
import IService from '../interfaces/IService';
import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _car: IModel<IMotorcycle>) {}

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }

    const created = await this._car.create(parsed.data);

    return created;
  }

  public async read(): Promise<IMotorcycle[]> {
    const cars = await this._car.read();

    return cars;
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const car = await this._car.readOne(_id);
    console.log(car);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);

    return car;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updated = await this._car.update(_id, parsed.data);
    if (!updated) throw new Error(ErrorTypes.EntityNotFound);

    return updated;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    const deleted = await this._car.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);

    return deleted;
  }
}
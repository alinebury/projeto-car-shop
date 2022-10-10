import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    const created = await this._model.create({ ...obj });

    return created as T;
  }

  public async read(): Promise<T[]> {
    const read = await this._model.find();

    return read;
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj:Partial<T>):
  Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    
    const updated = await this._model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );

    if (!updated) return null;

    return updated as T;
  }

  public async delete(_id:string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error();

    const deleted = await this._model.findByIdAndDelete({ _id });

    return deleted;
  }
}

export default MongoModel;
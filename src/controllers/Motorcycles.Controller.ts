import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const created = await this._service.create(req.body);

    return res.status(201).json(created);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const cars = await this._service.read();

    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const car = await this._service.readOne(req.params.id);

    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const updated = await this._service.update(id, req.body);

    return res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;

    const deleted = await this._service.delete(id);

    return res.status(204).json(deleted);
  }
}
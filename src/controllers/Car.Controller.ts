import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._service.create(req.body);

    res.status(201).json(created);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();

    res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar | null>) {
    const car = await this._service.readOne(req.params.id);

    res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;
    const updated = await this._service.update(id, req.body);

    res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<ICar | null>) {
    const { id } = req.params;

    const deleted = await this._service.delete(id);

    res.status(204).json(deleted);
  }
}
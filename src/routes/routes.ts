import { Router } from 'express';
import CarController from '../controllers/Car.Controller';
import CarService from '../services/Car.Service';
import CarModel from '../models/Car.Model';

import MotorcycleController from '../controllers/Motorcycles.Controller';
import MotorcycleService from '../services/Motorcycles.Service';
import MotorcycleModel from '../models/Motorcycles.Model';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

const motorcycles = new MotorcycleModel();
const motorcyclesService = new MotorcycleService(motorcycles);
const motorcyclesController = new MotorcycleController(motorcyclesService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.put('/cars/:id', (req, res) => carController.update(req, res));
route.delete('/cars/:id', (req, res) => carController.delete(req, res));

route.post('/motorcycles', (req, res) => motorcyclesController.create(req, res));
route.get('/motorcycles', (req, res) => motorcyclesController.read(req, res));
route.get('/motorcycles/:id', (req, res) => motorcyclesController.readOne(req, res));
route.put('/motorcycles/:id', (req, res) => motorcyclesController.update(req, res));
route.delete('/motorcycles/:id/', (req, res) => motorcyclesController.delete(req, res));

export default route;

import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const CarZodSchema = VehicleZodSchema.merge(z.object({
  doorsQty: z.number().positive().min(2).max(4),
  seatsQty: z.number().positive().min(2).max(7),
}));

type ICar = z.infer<typeof CarZodSchema>;

export { ICar, CarZodSchema };
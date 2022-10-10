import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = VehicleZodSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().positive().max(2500),
}));

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { IMotorcycle, MotorcycleZodSchema };
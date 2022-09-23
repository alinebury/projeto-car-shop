import { z } from 'zod';

const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022).positive(),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().positive(),
});

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { IVehicle, VehicleZodSchema };
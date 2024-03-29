import { zDto } from '@st-api/core';
import { z } from 'zod';

const PropertySchema = z
  .string()
  .transform((text) => text.split('\n').filter(Boolean));

export class WorkoutInputDto extends zDto(
  z.object({
    id: PropertySchema,
    startTime: PropertySchema,
    endTime: PropertySchema,
    duration: PropertySchema,
    totalDistance: PropertySchema,
    workoutActivityType: PropertySchema,
    totalEnergyBurned: PropertySchema,
    username: z.string().trim().min(1).max(255),
  }),
) {}

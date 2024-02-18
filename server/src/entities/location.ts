import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { z } from 'zod';
// import { validates } from '@server/utils/validation';
import { validates } from '../utils/validation';
import { Trip } from './trip';

// calis
@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  tripId: number;

  @ManyToOne(() => Trip, (trip) => trip.locations)
  trip: Trip;

  @Column('text')
  name: string;

  @Column('text')
  address: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @Column('text')
  type: string;
}

export type LocationBare = Omit<Location, 'trip'>;

export const locationSchema = validates<LocationBare>().with({
  id: z.number().int().positive(),
  tripId: z.number().positive(),
  name: z.string().trim().min(1, 'Location name is required').max(255),
  address: z.string().trim().min(1, 'Address is required').max(255),
  latitude: z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
  longitude: z
    .number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude'),
  type: z.string().trim().min(1, 'Location type is required').max(100),
});

export const locationInsertSchema = locationSchema.omit({ id: true });

export type LocationInsert = z.infer<typeof locationInsertSchema>;

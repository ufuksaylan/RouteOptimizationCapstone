import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { z } from 'zod';
// import { validates } from '@server/utils/validation';
import { validates } from '../utils/validation';

import { User } from './user';
import { Location } from './location';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  userId: number;

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn()
  user: User;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  optimalRoute: string;

  @OneToMany(() => Location, (location) => location.trip)
  locations: Location[];

  @CreateDateColumn()
  timeCreated: Date;
}

export type TripBare = Omit<Trip, 'user' | 'locations'>;

export const tripSchema = validates<TripBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  name: z
    .string()
    .trim()
    // with a friendly error message
    .min(2, 'Project name must be at least 2 characters long')
    .max(100),
  optimalRoute: z.string(),
  timeCreated: z.date(),
});

export const tripInsertSchema = tripSchema.omit({ id: true });

export type TripInsert = z.infer<typeof tripInsertSchema>;

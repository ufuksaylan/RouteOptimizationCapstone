import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { z } from 'zod';
// import { validates } from '@server/utils/validation';
import { validates } from '../utils/validation';

import { Trip } from './trip';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Unique(['email'])
  @Column('text')
  email: string;

  @Column('text', { select: false })
  password: string;

  @OneToMany(() => Trip, (trip) => trip.user, {
    cascade: ['insert'],
  })
  trips: Trip[];
}

export type UserBare = Omit<User, 'trips'>;

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),

  // We will trim and lowercase all emails, otherwise
  // lots of users will be frustrated when they try to
  // log in with "email@example" while they have
  // registered with "Email@example.com".
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(64),
});

export const userInsertSchema = userSchema.omit({ id: true });

export type UserInsert = z.infer<typeof userInsertSchema>;

export type AuthUser = Pick<User, 'id'>;

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
});

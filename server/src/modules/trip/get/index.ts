import { Trip, tripSchema, type TripBare } from '@server/entities/trip';

import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { TRPCError } from '@trpc/server';

export default authenticatedProcedure
  .input(tripSchema.shape.id)
  .query(async ({ input: projectId, ctx: { authUser, db } }) => {
    // Unfortunately TypeORM does not present correct types
    // for selected relations. We add a type assertion here.
    const trip = (await db.getRepository(Trip).findOne({
      where: { id: projectId },
    })) as TripBare;

    if (!trip) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Trip was not found`,
      });
    }

    // We could also require user to specify their id in the query
    // and then perform a where: { id: projectId, userId: authUser.id }
    // query.
    if (trip.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You are not allowed to access this project.`,
      });
    }

    return trip;
  });

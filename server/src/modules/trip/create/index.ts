import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { Trip, tripInsertSchema } from '@server/entities/trip';

export default authenticatedProcedure
  .input(tripInsertSchema.omit({ userId: true }))

  .mutation(async ({ input: tripData, ctx: { authUser, db } }) => {
    const trip = {
      ...tripData,
      userId: authUser.id,
    };

    const tripCreated = await db.getRepository(Trip).save(trip);

    return tripCreated;
  });

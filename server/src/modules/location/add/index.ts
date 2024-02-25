import { Location, Trip } from '@server/entities';
import { locationInsertSchema } from '@server/entities/location';
import { publicProcedure } from '@server/trpc';
import { TRPCError } from '@trpc/server';

export default publicProcedure
  .input(locationInsertSchema)
  .mutation(async ({ input: location, ctx: { db } }) => {
    const trip = await db.getRepository(Trip).findOneBy({
      id: location.tripId,
    });

    if (!trip) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Trip not found',
      });
    }

    const locationCreated = await db.getRepository(Location).save(location);

    return locationCreated;
  });

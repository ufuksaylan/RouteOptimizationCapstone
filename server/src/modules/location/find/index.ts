import { tripIdOwnerProcedure } from '@server/trpc/projectIdOwnerProcedure';
import {
  type LocationBare,
  Location,
  locationSchema,
} from '@server/entities/location';

export default tripIdOwnerProcedure
  .input(
    locationSchema.pick({
      tripId: true,
    })
  )
  .query(async ({ input: { tripId }, ctx: { db } }) => {
    const locations = (await db.getRepository(Location).find({
      where: {
        tripId,
      },
      order: { id: 'ASC' },
    })) as LocationBare[];

    return locations;
  });

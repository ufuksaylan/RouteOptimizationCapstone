import { Trip, type TripBare } from '@server/entities/trip';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id;

    // Unfortunately TypeORM does not present correct types
    // for selected relations. We add a type assertion here
    // which is safe as long as we are not using eager relations.
    // We still would have user and bugs in the result as undefined,
    // but they would be stripped out before being sent to the client.
    // Just in case, there is a test assertion to check if the
    // user or bugs are returned (they should not be).
    const trips = (await db.getRepository(Trip).find({
      where: { userId },
      order: { id: 'ASC' },
    })) as TripBare[];

    return trips;
  }
);

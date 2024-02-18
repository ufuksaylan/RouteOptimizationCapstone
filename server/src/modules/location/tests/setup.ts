import { createTestDatabase } from '@tests/utils/database';
import { fakeLocation, fakeTrip, fakeUser } from '@server/entities/tests/fakes';
import { Location, Trip, User } from '@server/entities';

/**
 * Sets up the necessary data for testing the trip module tests.
 */
export default async function setupBugTest() {
  const db = await createTestDatabase();

  const users = await db.getRepository(User).save([fakeUser(), fakeUser()]);

  const trips = await db
    .getRepository(Trip)
    .save([
      fakeTrip({ userId: users[0].id }),
      fakeTrip({ userId: users[1].id }),
    ]);

  const locations = await db
    .getRepository(Location)
    .save([
      fakeLocation({ tripId: trips[0].id }),
      fakeLocation({ tripId: trips[1].id }),
      fakeLocation({ tripId: trips[0].id }),
    ]);

  return {
    db,

    locations,
    trip: trips[0],
    user: users[0],
  };
}

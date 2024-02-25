import { authContext } from '@tests/utils/context';
import { Trip, User } from '@server/entities';
import { fakeTrip, fakeUser } from '@server/entities/tests/fakes';
import { createTestDatabase } from '@tests/utils/database';
import router from '..';

it('should return a list of trips', async () => {
  const db = await createTestDatabase();

  // a pair of users and trips to make sure we do not return other users' trips
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()]);

  await db
    .getRepository(Trip)
    .save([fakeTrip({ userId: user.id }), fakeTrip({ userId: userOther.id })]);

  const { find } = router.createCaller(authContext({ db }, user));

  // When (ACT)
  const userTrips = await find();

  // Then (ASSERT)
  expect(userTrips).toHaveLength(1);
  expect(userTrips[0]).toMatchObject({
    id: expect.any(Number),
    userId: user.id,

    // no relations
    user: undefined,
    locations: undefined,
  });
});

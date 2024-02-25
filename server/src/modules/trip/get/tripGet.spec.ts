import { authContext } from '@tests/utils/context';
import { Trip, User } from '@server/entities';
import { fakeTrip, fakeUser } from '@server/entities/tests/fakes';
import { createTestDatabase } from '@tests/utils/database';
import router from '..';

it('return the trip given the trip id', async () => {
  const db = await createTestDatabase();

  // a pair of users and trips to make sure we do not return other users' trips
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()]);

  const [trip1] = await db
    .getRepository(Trip)
    .save([fakeTrip({ userId: user.id }), fakeTrip({ userId: userOther.id })]);

  const { get } = router.createCaller(authContext({ db }, user));

  // When (ACT)
  const result = await get(trip1.id);

  // Then (ASSERT)
  expect(result).toMatchObject(trip1);
});

it('should throw an error if the trip does not exist', async () => {
  const db = await createTestDatabase();

  const user = await db.getRepository(User).save(fakeUser());

  const { get } = router.createCaller(authContext({ db }, user));

  // When (ACT)
  const result = get(999);

  // Then (ASSERT)
  await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Trip was not found"`
  );
});

it('should throw an error if the user is not autehticated', async () => {
  const db = await createTestDatabase();

  // a pair of users and trips to make sure we do not return other users' trips
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()]);

  const [trip1] = await db
    .getRepository(Trip)
    .save([fakeTrip({ userId: user.id }), fakeTrip({ userId: userOther.id })]);

  const { get } = router.createCaller(authContext({ db }, userOther));

  const result = get(trip1.id);

  await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
    `"You are not allowed to access this trip."`
  );
});

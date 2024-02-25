import { authContext } from '@tests/utils/context';
import { fakeLocation } from '@server/entities/tests/fakes';
import { TRPCError } from '@trpc/server';
import bugRouter from '..';
import setupBugTest from '../tests/setup';

it('should save and return a bug', async () => {
  // ARRANGE (Given)
  const { db, trip, user } = await setupBugTest();
  const { add } = bugRouter.createCaller(authContext({ db }, user));

  // ACT (When)
  const location = fakeLocation({ tripId: trip.id });
  const locationCreated = await add(location);

  // ASSERT (Then)
  expect(locationCreated).toMatchObject({
    ...location,
    id: expect.any(Number),
  });

  // ignores passed in id
  expect(locationCreated.id).not.toEqual(location.id);
});

it('should throw an error if the project is not found', async () => {
  // ARRANGE (Given)
  const { db, user } = await setupBugTest();
  const { add } = bugRouter.createCaller(authContext({ db }, user));
  // Create a location with a tripId that does not exist in the database
  const location = fakeLocation({ tripId: 99999 }); // Assuming -1 is an invalid tripId

  // ACT & ASSERT (When & Then)
  await expect(add(location)).rejects.toThrowError(
    new TRPCError({
      code: 'NOT_FOUND',
      message: 'Trip not found',
    })
  );
});

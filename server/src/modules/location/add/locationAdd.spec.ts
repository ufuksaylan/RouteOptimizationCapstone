import { authContext } from '@tests/utils/context';
import { fakeLocation } from '@server/entities/tests/fakes';
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

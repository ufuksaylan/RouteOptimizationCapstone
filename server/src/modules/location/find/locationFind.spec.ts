import { authContext } from '@tests/utils/context';
import locationRouter from '..';
import setupBugTest from '../tests/setup';

it('should return a list of bugs of a given project', async () => {
  // ARRANGE (Given)
  const { db, trip, user } = await setupBugTest();
  const { find } = locationRouter.createCaller(authContext({ db }, user));

  // ACT (When)
  const bugsFound = await find({
    tripId: trip.id,
  });

  // ASSERT (Then) - each returned bug should have the given projectId
  expect(bugsFound).toMatchObject([{ tripId: trip.id }, { tripId: trip.id }]);
});

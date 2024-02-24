import { authDistanceMatrixContext } from '@tests/utils/context';
import { fakeLocation, fakeUser, fakeTrip } from '@server/entities/tests/fakes';
import { createTestDatabase } from '@tests/utils/database';
import { it } from 'vitest';
import { fetchDistanceMatrix } from '@server/TomTom';
import solveTravelingSalesman from '@server/travellingSalesman';
import tripRouter from '..';

vi.mock('@server/TomTom', () => ({
  fetchDistanceMatrix: vi.fn().mockResolvedValue({
    data: [
      {
        originIndex: 0,
        destinationIndex: 0,
        routeSummary: {
          lengthInMeters: 0,
          travelTimeInSeconds: 0,
          trafficDelayInSeconds: 0,
          departureTime: '2022-12-19T16:39:57+01:00',
          arrivalTime: '2022-12-19T16:39:57+01:00',
        },
      },
      {
        originIndex: 0,
        destinationIndex: 1,
        routeSummary: {
          lengthInMeters: 170899,
          travelTimeInSeconds: 8464,
          trafficDelayInSeconds: 0,
          departureTime: '2022-12-19T16:39:57+01:00',
          arrivalTime: '2022-12-19T19:01:01+01:00',
        },
      },
      {
        originIndex: 1,
        destinationIndex: 0,
        routeSummary: {
          lengthInMeters: 181894,
          travelTimeInSeconds: 8804,
          trafficDelayInSeconds: 0,
          departureTime: '2022-12-19T16:39:57+01:00',
          arrivalTime: '2022-12-19T19:06:41+01:00',
        },
      },
      {
        originIndex: 1,
        destinationIndex: 1,
        routeSummary: {
          lengthInMeters: 0,
          travelTimeInSeconds: 0,
          trafficDelayInSeconds: 0,
          departureTime: '2022-12-19T16:39:57+01:00',
          arrivalTime: '2022-12-19T16:39:57+01:00',
        },
      },
    ],
    statistics: {
      totalCount: 4,
      successes: 4,
      failures: 0,
    },
  }),

  solveTravelingSalesman: vi.fn().mockResolvedValue({
    cities: ['1', '2'],
    distance: 352793,
  }),
}));

// Example with a mocked database
it('should give the optimal route', async () => {
  // ARRANGE (Given)
  const db = await createTestDatabase();

  const user = await db.getRepository('User').save(fakeUser());
  const trip = await db
    .getRepository('Trip')
    .save(fakeTrip({ userId: user.id }));

  const location1 = fakeLocation({
    tripId: trip.id,
    latitude: 46.4542,
    longitude: 1.151,
  });

  const location2 = fakeLocation({
    tripId: trip.id,
    latitude: 46.4542,
    longitude: 3.5534,
  });
  await db.getRepository('Location').save([location1, location2]);

  const { calculateOptimalRoute } = tripRouter.createCaller(
    authDistanceMatrixContext(
      { db },
      fetchDistanceMatrix,
      solveTravelingSalesman,
      user
    )
  );

  // ACT (When)
  const solution = await calculateOptimalRoute(trip);

  // ASSERT (Then)
  expect(solution.optimalRouteForDistance.sort()).toEqual(['1', '2'].sort());
});

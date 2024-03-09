// import { publicProcedure } from '@server/trpc';
import { tripSchema, Trip, type TripBare } from '@server/entities/trip';
import { distanceMatrixMiddleware } from '@server/trpc/provideDistanceMatrix';
import { type LocationBare, Location } from '@server/entities/location';
// import solveTravelingSalesman from '@server/travellingSalesman';
import type RespondTypeTSP from '@server/travellingSalesman/types/respond';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { salesmanAlgorithmMiddleware } from '@server/trpc/provideSalesmanAlgorithm';
import { createMatrices } from './service/createMatrices';
import extractLatLngPoints from './service/extractLatLngPoints';

export default authenticatedProcedure
  .use(distanceMatrixMiddleware)
  .use(salesmanAlgorithmMiddleware)
  .input(tripSchema.pick({ id: true }))
  .mutation(
    async ({
      input: trip,
      ctx: { db, fetchDistanceMatrix, solveTravelingSalesman },
    }) => {
      const tripFound = (await db.getRepository(Trip).findOne({
        where: { id: trip.id },
      })) as TripBare;

      if (tripFound.optimalRoute) {
        throw new Error('Optimal route is calculated');
      }

      const locations = (await db.getRepository(Location).find({
        where: {
          tripId: trip.id,
        },
        order: { id: 'ASC' },
      })) as LocationBare[];

      // return locations;

      const locationsForApi = extractLatLngPoints(locations);

      // return locationsForApi;

      const response = await fetchDistanceMatrix(
        locationsForApi,
        locationsForApi
      );

      const distanceMatrix = createMatrices(response);

      const locationsIds = locations.map((location) => `${location.id}`);

      const optimalRouteForDistance: RespondTypeTSP =
        await solveTravelingSalesman(locationsIds, distanceMatrix);

      // const optimalRouteForTime: RespondTypeTSP = await solveTravelingSalesman(
      //   locationsIds,
      //   timeMatrix
      // );

      await db.getRepository(Trip).update(
        { id: trip.id },
        {
          optimalRoute: optimalRouteForDistance.cities.join(','),
        }
      );

      return {
        optimalRouteForDistance: optimalRouteForDistance.cities,
      };
    }
  );

import { TRPCError } from '@trpc/server';
import z from 'zod';
import { Trip } from '@server/entities';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import provideRepos from '../provideRepos';

export const tripIdOwnerProcedure = authenticatedProcedure
  .use(provideRepos({ Trip }))
  .input(
    z.object({
      tripId: z.number(),
    })
  )
  .use(async ({ input: { tripId }, ctx: { authUser, repos }, next }) => {
    const trip = await repos.Trip.findOne({
      select: {
        userId: true,
      },
      where: {
        id: tripId,
      },
    });

    if (!trip) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Trip not found',
      });
    }

    if (trip.userId !== authUser.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Trip does not belong to the user',
      });
    }

    return next();
  });

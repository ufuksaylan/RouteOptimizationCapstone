import { fetchDistanceMatrix } from '@server/TomTom';
import { middleware } from '..';

export const distanceMatrixMiddleware = middleware(({ ctx, next }) => {
  ctx.fetchDistanceMatrix = fetchDistanceMatrix;
  return next({
    ctx: {
      fetchDistanceMatrix: ctx.fetchDistanceMatrix,
    },
  });
});

import solveTravelingSalesman from '@server/travellingSalesman';
import { middleware } from '..';

export const salesmanAlgorithmMiddleware = middleware(({ ctx, next }) => {
  ctx.solveTravelingSalesman = solveTravelingSalesman;
  return next({
    ctx: {
      solveTravelingSalesman: ctx.solveTravelingSalesman,
    },
  });
});

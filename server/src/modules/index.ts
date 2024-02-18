import { router } from '../trpc';
import user from './user';
import trip from './trip';
import location from './location';

export const appRouter = router({
  location,
  trip,
  user,
});

export type AppRouter = typeof appRouter;

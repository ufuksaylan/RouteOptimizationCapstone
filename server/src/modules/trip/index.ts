import { router } from '@server/trpc';
import create from './create';
import find from './find';
import get from './get';
import calculateOptimalRoute from './calculateOptimalRoute';

export default router({
  create,
  find,
  get,
  calculateOptimalRoute,
});

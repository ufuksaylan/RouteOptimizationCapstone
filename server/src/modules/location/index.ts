import { router } from '@server/trpc';
import add from './add';
import find from './find';

export default router({
  add,
  find,
});

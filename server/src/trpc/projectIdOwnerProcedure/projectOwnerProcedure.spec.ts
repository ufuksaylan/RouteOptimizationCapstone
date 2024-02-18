import { authContext } from '@tests/utils/context';
import { createTestDatabase } from '@tests/utils/database';
import { fakeTrip, fakeUser } from '@server/entities/tests/fakes';
import { User } from '@server/entities';
import { router } from '..';
import { tripIdOwnerProcedure } from '.';

const routes = router({
  testCall: tripIdOwnerProcedure.query(() => 'passed'),
});

const db = await createTestDatabase();

const [
  {
    trips: [tripOne],
    ...userOne
  },
  {
    trips: [tripTwo],
  },
] = await db.getRepository(User).save([
  fakeUser({
    trips: [fakeTrip()],
  }),
  fakeUser({
    trips: [fakeTrip()],
  }),
]);

const authenticated = routes.createCaller(authContext({ db }, userOne));

it('should pass if project belongs to the user', async () => {
  const response = await authenticated.testCall({ tripId: tripOne.id });

  expect(response).toEqual('passed');
});

it('should throw an error if projectId is not provided', async () => {
  // casting to any to allow calling without type safe input
  await expect((authenticated.testCall as any)({})).rejects.toThrow(/trip/i);
});

it('should throw an error if user provides a non-existing projectId', async () => {
  // casting to any to allow calling without type safe input
  await expect(
    (authenticated.testCall as any)({ projectId: 999 })
  ).rejects.toThrow(/trip/i);
});

it('should throw an error if user provides null projectId', async () => {
  await expect(authenticated.testCall({ tripId: null as any })).rejects.toThrow(
    /trip/i
  );
});

it('should throw an error if project does not belong to the user', async () => {
  await expect(authenticated.testCall({ tripId: tripTwo.id })).rejects.toThrow(
    /trip/i
  );
});

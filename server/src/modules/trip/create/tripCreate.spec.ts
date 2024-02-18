import { authContext } from '@tests/utils/context';
import { fakeUser } from '@server/entities/tests/fakes';
import { createTestDatabase } from '@tests/utils/database';
import { User } from '@server/entities';
import projectRouter from '..';

it('should create a persisted project', async () => {
  // ARRANGE
  const db = await createTestDatabase();
  const user = await db.getRepository(User).save(fakeUser());
  const { create } = projectRouter.createCaller(authContext({ db }, user));

  // ACT
  const tripCreated = await create({
    name: 'My Special Trip',
    optimalRoute: '',
    timeCreated: new Date(),
  });

  // ASSERT
  expect(tripCreated).toMatchObject({
    id: expect.any(Number),
    name: 'My Special Trip',
    userId: user.id,
  });
});

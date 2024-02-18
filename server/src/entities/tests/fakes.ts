import type { User } from '@server/entities/user';
import type { Location } from '@server/entities/location';
import type { Trip } from '@server/entities/trip';
import { random } from '@tests/utils/random';

const randomId = () => random.integer({ min: 1, max: 2147483647 });

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
});

/**
 * Generates a fake project with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeTrip = <T extends Partial<Trip>>(overrides: T = {} as T) => ({
  id: randomId(),
  name: random.string(),
  ...overrides,
});

// Generates a fake location with some default test data.
// @param overrides Any properties that should be different from default fake data.
export const fakeLocation = <T extends Partial<Location>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  name: 'OurFakeLocation',
  address: 'OurFakeAddress',
  latitude: random.latitude(),
  longitude: random.longitude(),
  type: 'OurFakeType',
  ...overrides,
});

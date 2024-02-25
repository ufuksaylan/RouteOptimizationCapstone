import { RoutingOptions } from '@server/TomTom/types/request';
import { ApiResponse } from '@server/TomTom/types/respond';
import { expect } from '@playwright/test';
import { fetchDistanceMatrix } from '.';

const options: RoutingOptions = {
  travelMode: 'pedestrian',
};

const postBodyExample = {
  origins: [
    {
      point: { latitude: 45.458545, longitude: 9.15049 },
    },

    {
      point: { latitude: 45.403337, longitude: 11.050541 },
    },
  ],

  destinations: [
    {
      point: { latitude: 48.149853, longitude: 11.499931 },
    },

    {
      point: { latitude: 50.033688, longitude: 14.538226 },
    },
  ],
  options,
};

describe('fetchDistanceMatrix', () => {
  it('should successfully call the TomTom API and return data', async () => {
    const response: ApiResponse = await fetchDistanceMatrix(
      postBodyExample.origins,
      postBodyExample.destinations,
      options
    );

    // Basic check to confirm we're getting a successful response structure
    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('statistics');
  }, 30000); // Extended timeout for API response variability
});

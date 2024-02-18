import axios from 'axios';
import config from '@server/config';
import type { OriginDestination, RoutingOptions, ApiResponse } from './types';

// Api limits for free plan: https://developer.tomtom.com/routing-api/documentation/matrix-routing-v2/synchronous-matrix#api-limitations
// All origins and destinations should be contained in an axis-aligned 400 km x 400 km bounding box.
// Otherwise some matrix cells will be resolved as OUT_OF_REGION.
// Fronted should check if the origins and destinations are within the bounding box and display an error message if not.

export async function fetchDistanceMatrix(
  origins: OriginDestination[],
  destinations: OriginDestination[],
  options: RoutingOptions = {
    travelMode: 'pedestrian',
  }
): Promise<ApiResponse> {
  const url = `https://api.tomtom.com/routing/matrix/2?key=${config.tomTomApiKey}`;
  const requestBody = {
    origins,
    destinations,
    options,
  };
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return await Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

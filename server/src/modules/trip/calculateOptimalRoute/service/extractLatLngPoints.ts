import type { LocationBare } from '@server/entities/location';

export default function extractLatLngPoints(locations: LocationBare[]) {
  return locations.map((location) => ({
    point: {
      latitude:
        typeof location.latitude === 'number'
          ? location.latitude
          : parseFloat(location.latitude),
      longitude:
        typeof location.longitude === 'number'
          ? location.longitude
          : parseFloat(location.longitude),
    },
  }));
}

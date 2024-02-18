import type { ApiResponse } from '@server/TomTom/types/respond';

export function createMatrices(data: ApiResponse) {
  const matrixSize = Math.sqrt(data.statistics.totalCount);
  const distanceMatrix = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(0)
  );
  // const timeMatrix = Array.from({ length: matrixSize }, () =>
  //   Array(matrixSize).fill(0)
  // );

  data.data.forEach(({ originIndex, destinationIndex, routeSummary }) => {
    distanceMatrix[originIndex][destinationIndex] =
      routeSummary?.lengthInMeters ?? 0;
    // timeMatrix[originIndex][destinationIndex] =
    //   routeSummary?.travelTimeInSeconds ?? 0;
  });

  return distanceMatrix;
}

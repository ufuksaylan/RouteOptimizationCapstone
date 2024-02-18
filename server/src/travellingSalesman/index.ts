// https://github.com/tiagoboeing/algoritmo-genetico-caixeiro-viajante/tree/master
// Travelling Salesman Problem - Genetic Algorithm

import axios from 'axios';
import type Respond from './types/respond';

export default async function postRequest(
  locationIds: string[],
  distanceMatrix: number[][]
): Promise<Respond> {
  const url = 'https://57ngqizuyi.execute-api.us-east-1.amazonaws.com/default';

  // const cities = locationIds.map((id) => id.toString());

  const data = {
    populationSize: 20,
    mutationRate: 1,
    generations: 100,
    cities: locationIds,
    distances: distanceMatrix,
  };

  const response = await axios.post(url, data);
  return response.data;
}

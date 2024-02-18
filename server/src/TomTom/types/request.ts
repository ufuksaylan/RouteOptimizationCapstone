export interface Point {
  latitude: number;
  longitude: number;
}

export interface OriginDestination {
  point: Point;
}

export interface RoutingOptions {
  departAt?: string;
  arriveAt?: string;
  traffic?: 'historical' | 'live';
  routeType?: 'fastest' | 'shortest';
  travelMode?: 'car' | 'truck' | 'pedestrian';
  vehicleMaxSpeed?: number;
  vehicleWeight?: number;
  vehicleAxleWeight?: number;
  vehicleLength?: number;
  vehicleWidth?: number;
  vehicleHeight?: number;
  vehicleCommercial?: boolean;
  vehicleLoadType?: string[];
  vehicleAdrTunnelRestrictionCode?: 'B' | 'C' | 'D' | 'E';
  avoid?: string[];
}

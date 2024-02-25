export interface RouteSummary {
  lengthInMeters: number;
  travelTimeInSeconds: number;
  trafficDelayInSeconds: number;
  departureTime: string;
  arrivalTime: string;
}

export interface DetailedError {
  code: string;
  message: string;
  innerError?: {
    code: string;
    message: string;
  };
}

export interface RouteData {
  originIndex: number;
  destinationIndex: number;
  routeSummary?: RouteSummary;
  detailedError?: DetailedError;
}

export interface FailureDetail {
  code: string;
  count: number;
}

export interface RouteStatistics {
  totalCount: number;
  successes: number;
  failures: number;
  failureDetails?: FailureDetail[];
}

export interface ApiResponse {
  data: RouteData[];
  statistics: RouteStatistics;
}

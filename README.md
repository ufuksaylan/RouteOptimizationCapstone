## Setup

1. `npm install`
2. Create a PostgreSQL database, or use an existing one from the previous exercises.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.

## Tests

```bash
# front end unit and E2E tests
npm test -w client

# front end unit tests
npm run test:unit -w client

# front end E2E tests
npm run test:e2e -w client

# back end tests with an in-memory database
npm test -w server

# back end tests with a development database
npm run test:db -w server
```

## Running the server

In development mode:

```bash
# automatically restarts the server
npm run dev

# server can be started without a database
npm run dev:mem
```

## Route Optimization Server

This server-side application is developed to demonstrate a practical implementation of route optimization algorithms.

## Project Overview

This server-side application is developed as a coding project to demonstrate the implementation of route optimization algorithms. The primary functionality is to calculate the most efficient route through a series of user-defined destinations. It's particularly useful for scenarios like tourists planning a city tour or individuals needing to visit multiple locations in a single trip. The algorithm focuses on minimizing travel distance and time, providing a practical solution to complex routing problems. This project showcases the application of algorithmic problem-solving in real-world travel scenarios.

## Features

- **Optimal Route Calculation**: Calculates the most efficient route for multiple destinations.
- **Multiple Destination Support**: Allows input of any number of destinations.
- **Practical Application**: Demonstrates the use of route optimization in everyday scenarios.

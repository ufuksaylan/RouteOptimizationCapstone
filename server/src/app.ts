import express from 'express';
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from '@trpc/server/adapters/express';
import cors from 'cors';
import config from '@server/config';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import type { Database } from './database';
import { appRouter } from './modules';
import type { Context } from './trpc';

export default function createApp(db: Database) {
  const { sentryServerDsn } = config;

  const app = express();

  if (sentryServerDsn) {
    console.log('Sentry enabled');
    console.log('Sentry DSN:', sentryServerDsn);
    Sentry.init({
      dsn: sentryServerDsn,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
        new ProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0,
    });

    // Add Sentry's request and tracing handlers as early as possible
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    // Test Sentry setup by capturing a test exception
    // Sentry.captureException(new Error('Sentry setup test error'));
  }

  app.use(cors());
  app.use(express.json());

  // Endpoint for health checks - pinging the server to see if it's alive.
  // This can be used by tests, load balancers, monitoring tools, etc.
  app.use('/health', (_, res) => {
    res.status(200).send('OK');
  });

  // Using TRPC router, which will live under /v1/trpc
  // path. It will be used for all our procedures.
  app.use(
    '/v1/trpc',
    createExpressMiddleware({
      // Created context for each request, which we will be able to
      // access in our procedures.
      createContext: ({ req, res }: CreateExpressContextOptions): Context => ({
        // What we provide to our procedures under `ctx` key.
        db,
        req,
        res,
      }),

      // all routes
      router: appRouter,
    })
  );

  if (sentryServerDsn) {
    console.log('Sentry error handler enabled');
    // The error handler must be registered before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());

    // @ts-ignore
    app.use((err, req, res, next) => {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500;
      res.end(`${res.sentry}\n`);
    });
  }

  return app;
}

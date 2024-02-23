import './assets/style.css'
import { sentryClientDsn } from './config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'
const app = createApp(App)

if (sentryClientDsn) {
  console.log('Sentry enabled')
  Sentry.init({
    app,
    dsn: sentryClientDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Session Replay
    logErrors: true, // Log errors to console in addition to sending to Sentry
    attachProps: true, // Attach Vue component props
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  })
}

app.use(createPinia())
app.use(router)

app.mount('#app')

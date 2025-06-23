import * as Sentry from "@sentry/nuxt";

Sentry.init({
  // If set up, you can use your runtime config here
  dsn: useRuntimeConfig().public.sentry.dsn,
  environment: "development",
  beforeSend(event) {
    const acceptedStatusCodeList = [
      204, 205, 206, 208, 226,
      300, 301, 305, 306, 307, 308,
      405, 406, 407, 408, 409, 410, 412, 413, 415, 416, 417,
      421, 422, 423, 424, 425, 428, 429, 431, 451,
      500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
    ];
    const statusCode = event.breadcrumbs.slice(-1)[0].data.status_code

    if (statusCode) {
      if (acceptedStatusCodeList.indexOf(statusCode) !== -1) {
        return event; 
      } else {
        return null;
      }
    }

    return event;
  },

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  
  // If you don't want to use Session Replay, just remove the line below:
  integrations: [Sentry.replayIntegration(), Sentry.globalHandlersIntegration({ onerror: true, onunhandledrejection: true })],
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

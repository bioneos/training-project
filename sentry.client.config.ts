import * as Sentry from "@sentry/nuxt";

Sentry.init({
  // If set up, you can use your runtime config here
  dsn: useRuntimeConfig().public.sentry.dsnClient,
  environment: process.env.ENV,

  // This will run just before sending any report to Sentry.io
  beforeSend(event: Sentry.Event) {
    const deniedStatusCodeList = [
      100, 101, 102, 103,
      200, 201, 202, 203,
      300, 301, 302, 303, 304,
      401, 402, 403, 404
    ];
    const statusCode = event.breadcrumbs.slice(-1)[0].data.status_code;

    if (statusCode) {
      if (deniedStatusCodeList.indexOf(statusCode) === -1) {
        return event; 
      } else {
        return null;
      }
    }

    return event;
  },

  // This will filter some log trace that are not necessary
  beforeBreadcrumb(breadcrumb: any) {
    const deniedBreadcrumbType = ['console'];

    if (deniedBreadcrumbType.indexOf(breadcrumb.category) === -1) {
      return breadcrumb
    } else {
      return null
    }
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

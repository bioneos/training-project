import * as Sentry from "@sentry/nuxt";

Sentry.init({
  // If set up, you can use your runtime config here
  dsn: useRuntimeConfig().public.sentry.dsn,
  environment: "development",
  beforeSend(event) {
    if (event.exception.values.value && event.exception.values.value) {	   
      const statusCode = parseInt(event.exception.values.value.split(":")[1].split(" ")[1]); 
      console.log(statusCode);

      if (statusCode >= 500 && statusCode <= 599) {
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

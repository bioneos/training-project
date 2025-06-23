import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: useRuntimeConfig().public.sentry.dsn,
  environment: "development",
  beforeSend(event, hint) {
    if (event.request && event.request.status) {	    
      if (event.request.status >= 500 && event.request.status <= 599) {
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
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

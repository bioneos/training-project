import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
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
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

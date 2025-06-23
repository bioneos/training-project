import * as Sentry from "@sentry/nuxt";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    Sentry.captureException(error);
  }

  nuxtApp.hook('vue:error', (error) => {
    Sentry.captureException(error);
  });
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  devServer: {
    port: Number(process.env.APP_PORT),
  },
  srcDir: "src/",
  
  typescript: {
    strict: false,
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },

  hooks: {
    'build:done': () => {
      // Add post-build hooks here (IF needed)
    }
  },

});

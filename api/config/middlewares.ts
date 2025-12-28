export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "connect-src": ["'self'", 'https:', 'http:'],
          "media-src": ["'self'", 'data:', 'blob:', env("SUPABASE_STORAGE_API_URL")],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            env("SUPABASE_STORAGE_API_URL"),
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  
];

export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-upload-supabase-provider',
      providerOptions: {
        apiUrl: env('SUPABASE_STORAGE_API_URL'),
        apiKey: env('SUPABASE_STORAGE_API_KEY'),
        bucket: env('SUPABASE_STORAGE_BUCKET'),
        directory: env('SUPABASE_STORAGE_DIRECTORY', ''),
      },
    },
    settings: {
      sizeLimit: 50 * 1024 * 1024,
      security: {
        checkFileSize: true,
        sizeLimit: 50 * 1024 * 1024,
      },
    },
  },
});
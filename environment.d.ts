declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      // Environment variables
      // ENV
      EVIRONMENT: string;

      // APP
      CORS_ORIGIN: string;
      APP_WEB_URL: string;
      APP_SECRET: string;

      // PRISMA
      DATABASE_URL: string;

      // GOOGLE OAUTH
      GOOGLE_CLIENT_ID: string;
      GOOGLE_SECRET_KEY: string;

      // MAIL
      MAIL_DRIVER: string;
      SENDGRID_API_KEY: string;

      // STORAGE
      STORAGE_DRIVER: string;

      // REDIS
      REDIS_USERNAME: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

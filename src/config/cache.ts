import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      username: process.env.REDIS_USERNAME,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined,
      tls: process.env.ENVIRONMENT === 'dev' ? undefined : {},
      connectTimeout: 30000,
    },
  },
} as ICacheConfig;

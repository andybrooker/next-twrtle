import Redis, { Redis as RedisInterface } from 'ioredis';

declare global {
  var redis: RedisInterface | undefined
}

export const redis =
  global.redis ||
  new Redis(process.env.REDIS_URL)

if (process.env.NODE_ENV !== 'production') global.redis = redis
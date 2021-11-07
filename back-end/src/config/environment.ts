export default {
  NODE_ENV: process.env.NODE_ENV,
  HOST_NAME: process.env.HOST_NAME,
  BASE_PATH: process.env.BASE_PATH || '',
  PORT: parseInt(process.env.PORT || ''),
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || '',
  JWT_TOKEN_EXPIRY_TIME_IN_HOURS: Number.parseInt(process.env.JWT_TOKEN_EXPIRY_TIME_IN_HOURS || '0')
};

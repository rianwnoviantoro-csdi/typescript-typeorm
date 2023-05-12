import "dotenv/config";

export const env = {
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  port: parseInt(<string>process.env.APP_PORT),
  pgHost: process.env.PG_HOST,
  pgPort: parseInt(<string>process.env.PG_PORT),
  pgUser: process.env.PG_USERNAME,
  pgPass: process.env.PG_PASSWORD,
  pgDBName: process.env.PG_DBNAME,
  secret: process.env.JWT_SECRET,
  refresh: process.env.JWT_REFRESH,
};

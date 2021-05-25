const env = process.env;

export default () => ({
  port: parseInt(env.PORT, 10) || 3000,
  type: env.DB_TYPE,
  mariadb: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10) || 3306,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  },
  sqlite: {
    database: env.SQLITE_PATH,
  },
});

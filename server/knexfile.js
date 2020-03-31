// Update with your config settings.
const config = {
  development: {
    client: "postgresql",
    connection: {
      database: "quicktrade_dev",
      user: "postgres",
      password: "postgres"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  }
};

module.exports = config;

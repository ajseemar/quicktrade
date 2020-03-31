const knexCleaner = require("knex-cleaner");

function seed(knex) {
  return knexCleaner.clean(knex, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    restartIdentity: true
  });
}

exports.seed = seed;

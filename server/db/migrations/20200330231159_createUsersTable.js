const Models = require("../../models");

exports.up = function(knex) {
  return knex.schema.createTable(Models.USERS.table, t => {
    t.increments("id")
      .primary()
      .unsigned();
    t.string("email")
      .unique()
      .index()
      .notNullable();
    t.string("password").notNullable();
    t.string("first_name").notNullable();
    t.string("last_name").notNullable();

    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(Models.USERS.table);
};

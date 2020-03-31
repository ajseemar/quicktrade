const Knex = require("knex");
const { Model } = require("objection");
const UserModel = require("../../models/userModel");
const faker = require("faker");
const { times } = require("lodash");

const knexFile = require("../../knexfile");
const knex = Knex(knexFile[process.env.NODE_ENV || "development"]);

Model.knex(knex);

const users = times(10, idx => {
  const id = idx + 1;
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    id,
    firstName,
    lastName,
    email: (firstName[0] + lastName + "@test.com").toLowerCase(),
    password: "password"
  };
});

async function seed(knex) {
  await UserModel.query().insert([
    ...users,
    {
      id: users.length + 1,
      firstName: "Fanny",
      lastName: "Boii",
      email: "test@test.com",
      password: "password"
    }
  ]);
  console.log("✅ Users");
}

exports.seed = seed;

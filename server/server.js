const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Knex = require("knex");
const knexFile = require("./knexfile");
const { Model } = require("objection");

const PORT = process.env.PORT || 5000;

console.log("Starting...");

console.log("Initializing KNEX...");
const knex = Knex(knexFile["development"]);
knex.migrate
  .status()
  .then(status => {
    if (status === 0) {
      console.log("The database is up-to-date with migrations");
    } else {
      console.log(
        `The database is ${status > 0 ? "ahead" : "behind"} by ${Math.abs(
          status
        )} migrations!`
      );
    }
  })
  .catch(err =>
    console.log("Failed to check migration status of database!", err)
  );

Model.knex(knex);

console.log("Initializing App...");
const app = express();
app.use(
  cors({
    origin: [/http:\/\/localhost(:3000|:5000)?./]
  })
);
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

console.log("Initializing Apollo Server...");
const { createApolloServer } = require("./initializeGqlServer");
createApolloServer().then(server => {
  server.applyMiddleware({ app });
  console.log("Setting up port listener");
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log(
      `🚀 Apollo Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});

app.get("/", (_, res) => res.send("Connected to server"));

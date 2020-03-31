const { ApolloServer } = require("apollo-server-express");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

function readFile(fp) {
  return fs.readFileAsync(fp, "utf-8");
}

async function readFiles(dirname) {
  const filenames = await fs.readdirAsync(dirname);
  return Promise.all(
    filenames.map(fn => readFile(dirname + "/" + fn, "utf-8"))
  );
}

const generateTypeDefs = async () => {
  const typeDefs = await readFiles(path.join(__dirname, "gql", "typedefs"));
  return typeDefs.join("\n");
};

const createApolloServer = async () => {
  const typeDefs = await generateTypeDefs();
  const resolvers = require("./gql/resolver");
  const server = new ApolloServer({ typeDefs, resolvers });
  return server;
};

module.exports = {
  generateTypeDefs,
  createApolloServer
};

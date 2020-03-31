const userResolver = require("./resolvers/userResolver");
const queryResolver = require("./resolvers/queryResolver");
const { merge } = require("lodash");

module.exports = merge(userResolver, queryResolver);

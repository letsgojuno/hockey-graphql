require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema');

module.exports = graphqlHTTP({
  schema: Schema,
  graphiql: true,
  pretty: true
});

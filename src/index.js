require('dotenv').config();
const { SECRET } = process.env;
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema');
const { send, json } = require('micro');
const jwtAuth = require('micro-jwt-auth');

module.exports = jwtAuth(SECRET)(
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    pretty: true
  })
);

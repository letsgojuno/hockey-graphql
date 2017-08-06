const api = require('./api');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const CrashType = new GraphQLObjectType({
  name: 'Crash',
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    stack: {
      type: GraphQLString,
      resolve: root =>
        api
          .get(`crashes/${root.id}`, { params: { format: 'log' } })
          .then(resp => resp.data)
    }
  })
});

const CrashReasonsType = new GraphQLObjectType({
  name: 'CrashReasons',
  description: '...',
  fields: () => ({
    id: { type: GraphQLString },
    reason: { type: GraphQLString },
    crashes: {
      type: new GraphQLList(CrashType),
      resolve: root =>
        api
          .get(`crash_reasons/${root.id}`)
          .then(resp => resp.data.crashes)
          .catch(console.log)
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'query',
  fields: () => ({
    crashReasons: {
      type: new GraphQLList(CrashReasonsType),
      resolve: () =>
        api.get('crash_reasons').then(response => response.data.crash_reasons)
    }
  })
});

module.exports = new GraphQLSchema({
  query: QueryType
});

import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;

// import "graphql-import-node";
// import * as typeDefs from "./schema/schema.graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default schema;

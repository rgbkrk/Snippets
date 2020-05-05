import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;

// Originally I was hoping I could do local schema.graphql files
// No go on that though...
// import "graphql-import-node";
// import * as typeDefs from "./schema/schema.graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default schema;

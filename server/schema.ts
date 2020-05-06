import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolverMap";
import { GraphQLSchema } from "graphql";
import gql from "graphql-tag";

import { Context } from "./context";

const typeDefs = gql`
  type Session {
    id: String
    code: String
    result: String
  }

  type Query {
    sessions: [Session!]!
  }

  type Mutation {
    execute(code: String): Session!
  }
`;

// Originally I was hoping I could do local schema.graphql files
// No go on that though...
// import "graphql-import-node";
// import * as typeDefs from "./schema/schema.graphql";

const schema: GraphQLSchema = makeExecutableSchema<Context>({
  typeDefs,
  resolvers,
});
export default schema;

import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import schema from "./schema";

import SessionsAPI from "./datasources/sessions";

const app = express();
const server = new ApolloServer({
  dataSources: () => ({
    sessionsAPI: new SessionsAPI({}),
  }),
  schema,
  validationRules: [depthLimit(7)],
});

app.use("*", cors());
app.use(compression());
server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
httpServer.listen({ port: 7101 }, (): void =>
  console.log(
    `\n🚀      Snippets GraphQL is now running on http://localhost:7101/graphql`
  )
);

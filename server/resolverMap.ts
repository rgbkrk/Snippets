import { IResolvers } from "graphql-tools";

import GraphQLJSON from "graphql-type-json";

import { Context } from "./context";

import { Session } from "./datasources/sessions";

const resolverMap: IResolvers<any, Context> = {
  JSON: GraphQLJSON,

  Session: {
    variables: (root, args, context, info) =>
      JSON.parse(JSON.stringify(root.sandbox)),
  },

  Query: {
    sessions(_source: any, args: any, ctx: Context): Session[] {
      const sessions = ctx.dataSources.sessionsAPI.list();
      return sessions;
    },
    session(
      _source: any,
      args: { id: string },
      ctx: Context
    ): Session | undefined {
      return ctx.dataSources.sessionsAPI.get(args.id);
    },
  },
  Mutation: {
    async execute(
      _source: any,
      args: { code: string },
      ctx: Context
    ): Promise<Session> {
      const session = await ctx.dataSources.sessionsAPI.execute(args.code);
      return session;
    },
  },
};
export default resolverMap;

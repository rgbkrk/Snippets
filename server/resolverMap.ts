import { IResolvers } from "graphql-tools";
import { Context } from "./context";

import { Session } from "./datasources/sessions";

type Source = {};

const resolverMap: IResolvers<Source, Context> = {
  Query: {
    sessions(_source: Source, args: any, ctx: Context): Session[] {
      const sessions = ctx.dataSources.sessionsAPI.list();
      return sessions;
    },
  },
  Mutation: {
    async execute(
      _source: Source,
      args: { code: string },
      ctx: Context
    ): Promise<Session> {
      const session = await ctx.dataSources.sessionsAPI.execute(args.code);
      return session;
    },
  },
};
export default resolverMap;

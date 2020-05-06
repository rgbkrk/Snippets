import { DataSource, DataSourceConfig } from "apollo-datasource";

import {
  runInContext as runInSandbox,
  Context as Sandbox,
  createContext as createSandbox,
} from "vm";

import * as uuid from "uuid";

type SessionConfig = {};

export type Session = {
  code: string;
  sandbox: Sandbox;
  id: string;
  result?: any;
};

type Context = {
  sessions: { [key: string]: Session };
};

class SessionsAPI extends DataSource<Context> {
  config: SessionConfig;
  context!: Context;

  constructor(config: SessionConfig) {
    super();
    this.config = config;
  }

  async execute(code: string) {
    const id = uuid.v4();

    let session: Session = {
      code,
      // Create a sandbox with nothing but JS primitives (no console, no require)
      sandbox: createSandbox({}),
      id,
    };

    this.context.sessions[id] = session;
    let result;

    try {
      result = runInSandbox(code, session.sandbox);
    } catch (err) {
      result = {
        type: "error",
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }

    session.result = JSON.parse(JSON.stringify(result, null, 2));

    return session;
  }

  get(id: string): Session | undefined {
    return this.context.sessions[id];
  }

  list(): Session[] {
    return Object.values(this.context.sessions);
  }

  initialize(dsconfig: DataSourceConfig<Context>) {
    this.context = dsconfig.context;

    // Initialize the sessions
    if (!this.context.sessions) {
      this.context.sessions = {};
    }
  }
}

export default SessionsAPI;

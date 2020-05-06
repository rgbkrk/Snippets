import { DataSource, DataSourceConfig } from "apollo-datasource";

import {
  runInContext as runInSandbox,
  Context as Sandbox,
  createContext as createSandbox,
} from "vm";

import * as uuid from "uuid";

import { Context } from "../context";

type Sessions = { [key: string]: Session };

type SessionConfig = {
  sessions: Sessions;
};

export type Session = {
  code: string;
  sandbox: Sandbox;
  id: string;
  result?: any;
};

class SessionsAPI extends DataSource<Context> {
  context!: Context;
  sessions: Sessions;

  constructor(config: SessionConfig) {
    super();
    this.sessions = config.sessions;
  }

  async execute(code: string) {
    const id = uuid.v4();

    let session: Session = {
      code,
      // Create a sandbox with nothing but JS primitives (no require)
      sandbox: createSandbox({ setTimeout, setInterval }),
      id,
    };

    this.sessions[id] = session;
    let result;

    try {
      result = runInSandbox(code, session.sandbox);
    } catch (err) {
      result = {
        _type: "error",
        name: err.name,
        message: err.message,
        stack: err.stack,
      };
    }

    result = JSON.stringify(result, null, 2);

    // Workaround for the case where JSON.stringify returns undefined
    // This happens with native code like console.log (Try `JSON.stringify(console.log)` yourself!)
    if (result === undefined) {
      result = "undefined";
    }

    // Loose hacking to create a JSON compatible representation of the result
    session.result = JSON.parse(JSON.stringify(result, null, 2));

    return session;
  }

  get(id: string): Session | undefined {
    return this.sessions[id];
  }

  list(): Session[] {
    return Object.values(this.sessions);
  }

  initialize(dsconfig: DataSourceConfig<Context>) {
    this.context = dsconfig.context;
  }
}

export default SessionsAPI;

import SessionsAPI from "./datasources/sessions";

export type Context = {
  dataSources: {
    sessionsAPI: SessionsAPI;
  };
};

import { IClients, ISessionBookings, IStudioSessions } from "../../@types";

export enum TYPES {
  RETRIEVE_SESSION_BOOKINGS = "RETRIEVE_SESSION_BOOKINGS",
  GET_ALL_CLIENTS = "GET_ALL_CLIENTS",
  CREATE_STUDIO_SESSIONS = "CREATE_STUDIO_SESSIONS",
  GET_ALL_STUDIO_SESSIONS = "GET_ALL_STUDIO_SESSIONS",
  BOOK_A_STUDIO_SESSION = "BOOK_A_STUDIO_SESSION",
}

export interface State {
  studios: Array<IClients>;
  sessions: Array<IStudioSessions>;
  sessionBookings: Array<ISessionBookings>;
}

export type IRetrieveSessionBookings = {
  type: TYPES.RETRIEVE_SESSION_BOOKINGS;
  payload: Array<ISessionBookings>;
};

export type IGetClientSuccess = {
  type: TYPES.GET_ALL_CLIENTS;
  payload: Array<IClients>;
};

export type ICreateStudioSession = {
  type: TYPES.CREATE_STUDIO_SESSIONS;
};
export type IGetAllStudioSessions = {
  type: TYPES.GET_ALL_STUDIO_SESSIONS;
  payload: Array<IStudioSessions>;
};

export type IBookStudioSession = {
  type: TYPES.BOOK_A_STUDIO_SESSION;
};

export type AppActions =
  | IGetClientSuccess
  | ICreateStudioSession
  | IGetAllStudioSessions
  | IBookStudioSession
  | IRetrieveSessionBookings;

import { IClients, IStudioSessions } from "../../@types";

export enum TYPES {
  GET_MERCHANT_ID = "GET_MERCHANT_ID",
  GET_STUDIO_SESSION_ID = "GET_STUDIO_SESSION_ID",
  GET_ALL_CLIENTS = "GET_ALL_CLIENTS",
  CREATE_STUDIO_SESSIONS = "CREATE_STUDIO_SESSIONS",
  GET_ALL_STUDIO_SESSIONS = "GET_ALL_STUDIO_SESSIONS",
  BOOK_A_STUDIO_SESSION = "BOOK_A_STUDIO_SESSION",
}

export interface State {
  merchantId: string;
  sessionId: string;
  studios: Array<IClients>;
  sessions: Array<IStudioSessions>;
}

export type IGetStudioSessionId = {
  type: TYPES.GET_STUDIO_SESSION_ID;
  payload: string;
};

export type IGetMerchantId = {
  type: TYPES.GET_MERCHANT_ID;
  payload: string;
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
  | IGetStudioSessionId
  | IGetMerchantId;

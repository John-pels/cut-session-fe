import { legacy_createStore as createStore } from "redux";
import { AppActions, State, TYPES } from "../types";

const INITIAL_STATE: State = {
  merchantId: "",
  sessionId: "",
  sessions: [],
  studios: [],
};

const appReducer = (state: State = INITIAL_STATE, action: AppActions) => {
  console.group(state, action);
  switch (action.type) {
    case TYPES.GET_MERCHANT_ID: {
      return {
        ...state,
        merchantId: action.payload,
      };
    }

    case TYPES.GET_STUDIO_SESSION_ID: {
      return {
        ...state,
        sessionId: action.payload,
      };
    }

    case TYPES.GET_ALL_STUDIO_SESSIONS: {
      return {
        ...state,
        sessions: action.payload,
      };
    }
    case TYPES.GET_ALL_CLIENTS: {
      return {
        ...state,
        studios: action.payload,
      };
    }
    case TYPES.CREATE_STUDIO_SESSIONS: {
      return state;
    }

    default:
      return state;
  }
};

export const store = createStore(appReducer);

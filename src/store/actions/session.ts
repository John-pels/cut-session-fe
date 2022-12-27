import { IBookStudioSession, ICreateStudioSession } from "../../@types";
import requestService from "../../services/requests";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { store } from "../reducers";
import { TYPES } from "../types";

export const getAllStudioSessionsAction = async (
  merchantId: string,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.getStudioSessions(merchantId);
    console.log(response.data);
    if (response.data) {
      store.dispatch({
        type: TYPES.GET_ALL_STUDIO_SESSIONS,
        payload: response.data,
      });
      onSuccess?.();
    }
  } catch (err) {
    console.log(err);
    formatErrorMessage(err, onError);
  }
};

export const bookStudioSessionAction = async (
  payload: IBookStudioSession,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.bookStudioSession(payload);
    console.log(response.data);
    if (response.data) {
      store.dispatch({
        type: TYPES.BOOK_A_STUDIO_SESSION,
      });
      onSuccess?.();
    }
  } catch (err) {
    console.log(err);
    formatErrorMessage(err, onError);
  }
};

export const retrieveSessionBookingsAction = async (
  queries: string,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.retrieveSessionBookings(queries);
    if (response.data) {
      store.dispatch({
        type: TYPES.RETRIEVE_SESSION_BOOKINGS,
        payload: response.data.data,
      });
      onSuccess?.();
    }
  } catch (err) {
    console.log(err);
    formatErrorMessage(err, onError);
  }
};

export const createStudioSessionAction = async (
  payload: ICreateStudioSession,
  merchantId: string,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.createStudioSessions(
      payload,
      merchantId
    );
    if (response.data) {
      store.dispatch({
        type: TYPES.CREATE_STUDIO_SESSIONS,
      });
      onSuccess?.();
    }
  } catch (err) {
    console.log(err);
    formatErrorMessage(err, onError);
  }
};

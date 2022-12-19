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

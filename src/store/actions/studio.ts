import requestService from "../../services/requests";
import { formatErrorMessage } from "../../utils/formatErrorMessage";
import { store } from "../reducers";
import { TYPES } from "../types";

export const getAllStudiosAction = async (
  queries: string,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.getClients(queries);
    console.log(response.data);
    if (response.data) {
      store.dispatch({
        type: TYPES.GET_ALL_CLIENTS,
        payload: response.data.data,
      });
      onSuccess?.();
    }
  } catch (err) {
    console.log(err);
    formatErrorMessage(err, onError);
  }
};

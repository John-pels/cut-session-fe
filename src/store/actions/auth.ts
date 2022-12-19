import { saveToStorage } from "../../utils/storage";
import { ISignInPayload, IUserSignUpPayload } from "../../@types";
import requestService from "../../services/requests";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

export const registerAction = async (
  payload: IUserSignUpPayload,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.userSignUp(payload);
    console.log(response.data);
    if (response.data.userId) {
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};

export const loginAction = async (
  payload: ISignInPayload,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.userSignIn(payload);
    console.log(response.data);
    if (response.data) {
      saveToStorage("access-token", response?.data?.token);
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};

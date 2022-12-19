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
    const userId = response.data.userId;
    const token = response.data.token;
    if (response.data) {
      saveToStorage("cs-user", { token, userId });
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};

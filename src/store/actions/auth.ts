import { saveToStorage } from "../../utils/storage";
import {
  IMerchantSignUpPayload,
  ISignInPayload,
  IUserSignUpPayload,
} from "../../@types";
import requestService from "../../services/requests";
import { formatErrorMessage } from "../../utils/formatErrorMessage";

export const registerAction = async (
  payload: IUserSignUpPayload,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.userSignUp(payload);
    if (response.data.userId) {
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};
export const registerMerchantAction = async (
  payload: IMerchantSignUpPayload,
  onSuccess: () => void,
  onError: (msg: string) => void
) => {
  try {
    const response = await requestService.merchantSignUp(payload);
    if (response.data.merchantId) {
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};

export const loginAction = async (
  payload: ISignInPayload,
  onSuccess: () => void,
  onError: (msg: string) => void,
  isMerchant: boolean = false
) => {
  try {
    const response = await requestService.userSignIn(payload);
    console.log(response.data);
    const userId: string = response.data.userId;
    const token: string = response.data.token;
    if (response.data && !isMerchant) {
      saveToStorage("cs-user", { token, userId });
      onSuccess?.();
    }
    if (response.data && isMerchant) {
      const merchantId: string = response.data.merchantId;
      saveToStorage("cs-merchant", { token, merchantId });
      onSuccess?.();
    }
  } catch (err) {
    formatErrorMessage(err, onError);
  }
};

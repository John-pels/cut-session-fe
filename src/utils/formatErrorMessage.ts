import axios from "axios";

export const formatErrorMessage = (
  err: unknown,
  onError: (msg: string) => void
) => {
  let errMsg;
  if (axios.isAxiosError(err) && err.response) {
    errMsg = err.response.data.message;
    return onError?.(errMsg ?? "Something went wrong, please try again");
  }
  errMsg = String(err);
  return onError?.(errMsg ?? "Something went wrong, please try again");
};

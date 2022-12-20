import { getAccessToken } from "./storage";

export const withAuth = () => {
  const { token } = getAccessToken();
  if (!token) return window.location.replace("/");
};

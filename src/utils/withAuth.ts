import { getAccessToken } from "./storage";

export const withAuth = (key?: string) => {
  const { token } = getAccessToken(key);
  if (key && !token) return window.location.replace("/merchant/login");
  if (!token) return window.location.replace("/");
};

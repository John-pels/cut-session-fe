import SecureLS from "secure-ls";
import jwtDecode, { JwtPayload } from "jwt-decode";

export let ls = new SecureLS({ encodingType: "aes", isCompression: true });

export const saveToStorage = (key: string, value: any) => {
  return ls?.set(key, value);
};

export const getAccessToken = (key: string = "altStudent") => {
  const data = ls?.get(key);
  return data;
};

export const clearToken = () => {
  return ls.clear();
};

export const verifyToken = (token: string): boolean => {
  let isTokenExpired = false;
  if (!token) return isTokenExpired;
  if (typeof window !== "undefined") {
    const decoded = jwtDecode<JwtPayload | any>(token);
    const currentTime = new Date().getTime();
    const tokenExpiryTime = decoded.exp * 1000;
    isTokenExpired = tokenExpiryTime < currentTime;
  }
  return isTokenExpired;
};

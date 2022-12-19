import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/storage";

const ACCESS_TOKEN = "access-token";
class BaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    });
    this.attachInterceptors();
  }

  private attachInterceptors() {
    this.api.interceptors.request.use(async (req: AxiosRequestConfig) => {
      try {
        const token: any = await getAccessToken(ACCESS_TOKEN);

        if (token) {
          req.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        //Do nothing
      }

      return req;
    });
  }
}

export default BaseRequest;

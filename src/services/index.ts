import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/storage";

const ACCESS_TOKEN = "cs-user";
const MERCHANT_ACCESS_TOKEN = "cs-merchant";
class BaseRequest {
  protected api: AxiosInstance;
  protected merchantApi: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    });
    this.merchantApi = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    });
    this.attachInterceptors();
  }

  private attachInterceptors() {
    this.api.interceptors.request.use(async (req: AxiosRequestConfig) => {
      try {
        const { token } = await getAccessToken(ACCESS_TOKEN);

        if (token) {
          req.headers!.Authorization = `Bearer ${token}`;
          req.headers!.Prefer = "code=200, dynamic=true";
        }
      } catch (error) {
        //Do nothing
      }

      return req;
    });

    this.merchantApi.interceptors.request.use(
      async (req: AxiosRequestConfig) => {
        try {
          const { token } = await getAccessToken(MERCHANT_ACCESS_TOKEN);

          if (token) {
            req.headers!.Authorization = `Bearer ${token}`;
            req.headers!.Prefer = "code=200, dynamic=true";
          }
        } catch (error) {
          //Do nothing
        }

        return req;
      }
    );
  }
}

export default BaseRequest;

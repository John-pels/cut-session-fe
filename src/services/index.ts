import axios, { AxiosInstance } from "axios";

class BaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.env.VITE_BACKEND_API_URL,
    });
  }
}

export default BaseRequest;

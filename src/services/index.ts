import axios, { AxiosInstance } from "axios";

class BaseRequest {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.env.NEXT_PUBLIC_FORM_BACKEND_API_URL,
    });
  }
}

export default BaseRequest;

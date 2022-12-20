import BaseRequest from ".";
import {
  IBookStudioSession,
  ICreateStudioSession,
  IMerchantSignUpPayload,
  ISignInPayload,
  IUserSignUpPayload,
} from "../@types";
import { API_ROUTES } from "./routes";

class RequestService extends BaseRequest {
  constructor() {
    super();
  }
  userSignIn = async (payload: ISignInPayload) => {
    return await this.api.post(API_ROUTES.SIGN_IN, payload);
  };
  userSignUp = async (payload: IUserSignUpPayload) => {
    return await this.api.post(API_ROUTES.USER_SIGN_UP, payload);
  };
  merchantSignUp = async (payload: IMerchantSignUpPayload) => {
    return await this.api.post(API_ROUTES.MERCHANT_SIGN_UP, payload);
  };
  getClients = async (queries = "") => {
    return await this.api.get(`${API_ROUTES.GET_CLIENTS}${queries}`);
  };

  createStudioSessions = async (payload: ICreateStudioSession) => {
    return await this.merchantApi.post(
      API_ROUTES.CREATE_STUDIO_SESSIONS,
      payload
    );
  };
  bookStudioSession = async (payload: IBookStudioSession) => {
    return await this.api.post(API_ROUTES.BOOK_A_STUDIO_SESSION, payload);
  };
  retrieveSessionBookings = async (queries = "") => {
    return await this.merchantApi.get(
      `${API_ROUTES.RETRIEVE_SESSION_BOOKINGS}${queries}`
    );
  };
  getStudioSessions = async (merchantId: string) => {
    return await this.api.get(
      `${API_ROUTES.GET_STUDIO_SESSIONS}/${merchantId}`
    );
  };
}

const requestService = new RequestService();

export default requestService;

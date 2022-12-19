declare global {
  interface Window {
    route: (e) => void;
  }
  interface Params {
    merchantId: string;
    sessionId: string;
  }
}

export type IUrlRoutes = {
  [key: string | number]: {
    template: string;
    title: string;
    description: string;
  };
};

export type ISignInPayload = {
  username: string;
  password: string;
  accessType: "USER" | "MERCHANT";
};
export type IMerchantSignUpPayload = {
  name: string;
  email: string;
  cityOfOperation?: string;
  username: string;
  password: string;
  phoneNumber?: string;
  metadata?: Object;
};

export interface IUserSignUpPayload extends IMerchantSignUpPayload {
  dob: string;
}

export type ICreateStudioSession = {
  startsAt: string;
  endsAt: string;
  type: string;
};

export type IBookStudioSession = {
  sessionId: string;
  date: string;
  userId: string;
  notes: string;
  title: string;
};

export type IClients = {
  merchantId: string;
  name: string;
  email: string;
  cityOfOperation: string;
  phoneNumber: string;
};

export type IStudioSessions = {
  id: string;
  merchantId: string;
  startsAt: string;
  endsAt: string;
  type: string;
};

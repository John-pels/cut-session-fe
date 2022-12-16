declare global {
  interface Window {
    route: (e) => void;
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
  username: "string";
  password: "pa$$word";
  accessType: "USER" | "MERCHANT";
};
export type IMerchantSignUpPayload = {
  name: string;
  email: string;
  cityOfOperation?: string;
  username: string;
  password: string;
  phoneNumber: string;
  metadata: Object;
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

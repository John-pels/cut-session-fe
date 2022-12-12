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

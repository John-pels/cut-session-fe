import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PageNotFound from "../pages/404";
import StudioSessions from "../pages/StudioSessions";
import BookSession from "../pages/BookSession";
import Component from "../pages/Component";
import MerchantLogin from "../pages/merchant/Login";
import MerchantRegister from "../pages/merchant/Register";
import CreateStudioSession from "../pages/merchant/CreateSession";
import RetrieveSessionsBookings from "../pages/merchant/RetrieveSession";

const rootElement = document.querySelector("#root") as HTMLElement;

const pathToRegex = (path: string) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match: {
  route: { path: string; view: typeof Component };
  result: [k: string];
}) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const router = async () => {
  const routes: Array<{ path: string; view: typeof Component }> = [
    { path: "/", view: LoginPage },
    { path: "/register", view: RegisterPage },
    { path: "/dashboard", view: Dashboard },
    { path: "/dashboard/studio/:merchantId", view: StudioSessions },
    { path: "/dashboard/book/:sessionId", view: BookSession },

    //Merchant routes
    { path: "/merchant/login", view: MerchantLogin },
    { path: "/merchant/register", view: MerchantRegister },
    { path: "/merchant/session/create", view: CreateStudioSession },
    { path: "/merchant/dashboard", view: RetrieveSessionsBookings },

    { path: "/*", view: PageNotFound },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match: any = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  return view.render();
};

export { router, navigateTo, rootElement };

import { IUrlRoutes } from "../@types";

const pageTitle = "Cut Session";
const rootElement = document.getElementById("root") as HTMLElement; //get the root element
const rootMetaDescription = document.querySelector(
  'meta[name="description"]'
) as HTMLElement; // get the root element meta description

//create document click that watches the links only
document.addEventListener("click", (event) => {
  const { target } = event;
  if (!(target as Element).matches("a")) {
    return;
  }
  event.preventDefault();
  urlRoute(event);
});

const urlRoute = (event: any) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

// create an object that maps the url to the template, title, and description
const urlRoutes: IUrlRoutes = {
  "404": {
    template: "/src/pages/404.html",
    title: "404 | " + pageTitle,
    description: "Page not found",
  },
  "/": {
    template: "/src/pages/index.html",
    title: "Home | " + pageTitle,
    description: "This is the home page",
  },
  "/dashboard": {
    template: "/src/pages/dashboard.html",
    title: "Dashboard | " + pageTitle,
    description: "This is the dashboard page",
  },
  "/register": {
    template: "/src/pages/register.html",
    title: "Register | " + pageTitle,
    description: "This is the registration page",
  },
  "/studio_details": {
    template: "/src/pages/studio_details.html",
    title: "Studio Details | " + pageTitle,
    description: "This is the studio details page",
  },
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;
  if (location.length == 0) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  rootElement.innerHTML = html;
  document.title = route.title;
  rootMetaDescription.setAttribute("content", route.description);
};

// call the urlLocationHandler function to handle the initial url
export { urlLocationHandler, urlRoute };

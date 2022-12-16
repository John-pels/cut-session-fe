import { router, navigateTo } from "./router";

window.onpopstate = router;
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    const { target } = event;
    if ((target as Element).matches("[data-url]")) {
      event.preventDefault();
      navigateTo((target as HTMLAnchorElement).href);
    }
  });

  router();
});

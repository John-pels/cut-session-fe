import { form, validateFormInputs } from "./formValidation";
import { urlLocationHandler, urlRoute } from "./router";

//Login and Regsiter form validation function;
window.onload = () => {
  console.log("hey");
  form?.addEventListener("submit", (event) => {
    console.log("event", event);
    event.preventDefault();
    validateFormInputs();
  });
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;

// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
urlLocationHandler();

import { IMerchantSignUpPayload } from "../../@types";
import { Notification } from "../../scripts/notification";
import { navigateTo, rootElement } from "../../scripts/router";
import { registerMerchantAction } from "../../store/actions/auth";
import Component from "../Component";
class MerchantRegister extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Sign-Up");
  }

  onSuccess() {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Create Account";
    button.disabled = false;
    Notification("Your registration is succesful, kindly Sign in to continue");
    navigateTo("/merchant/login");
  }

  onError(msg: string) {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Create Account";
    button.disabled = false;
    Notification(msg, "error");
  }

  handleRegister = () => {
    const form = document.querySelector("#form") as HTMLFormElement;
    const button = document.querySelector("#button") as HTMLButtonElement;
    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const name = document.querySelector("#name") as HTMLInputElement;
    const cityOfOperation = document.querySelector(
      "#cityOfOperation"
    ) as HTMLInputElement;
    const email = document.querySelector("#email") as HTMLInputElement;
    const callback = (event: Event) => {
      event.preventDefault();
      const usernameValue = username.value;
      const passwordValue = password.value;
      const cityValue = cityOfOperation.value;
      const nameValue = name.value;
      const emailValue = email.value;
      const payload: IMerchantSignUpPayload = {
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        cityOfOperation: cityValue,
        name: nameValue,
      };
      console.log("hey", payload);
      button.textContent = "please wait...";
      button.disabled = true;
      registerMerchantAction(payload, this.onSuccess, this.onError);
    };

    form.addEventListener("submit", callback);
  };

  methods() {
    this.handleRegister();
  }

  getHtml() {
    return `
    <section class="container">
    <div class="flex">
    <div class="auth-content box">
      <div class="brand">
        <img src="/cut-session.svg" alt="brand logo" class="brand__logo" />
      </div>
      <h2 class="heading">Create a Merchant account</h2>
      <form class="form" id="form">
        <div class="form__input-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            class="form__input"
            name="name"
            id="name"
            placeholder="John Doe"
            data-name
            required
          />
          <small>Error message</small>
        </div>
        <div class="form__input-group">
          <label for="email">Email Address </label>
          <input
            type="email"
            class="form__input"
            name="email"
            id="email"
            placeholder="me@example.com"
            data-email
            required
          />
          <small>Error message</small>
        </div>
        <div class="form__input-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form__input"
            name="username"
            id="username"
            placeholder="john_doe"
            data-username
            required
          pattern="^(?!.* ).{3,}$"
          />
          <small>Error message</small>
        </div>
        <div class="form__input-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form__input"
            name="password"
            id="password"
            placeholder="*******"
            data-password
            required
            pattern="^(?!.* ).{6,}$"
          />
          <small>Error message</small>
        </div>
        <div class="form__input-group">
          <label for="cityOfOperation">City of Operation</label>
          <input
            type="text"
            class="form__input"
            name="cityOfOperation"
            id="cityOfOperation"
            data-cityOfOperation
            required
          />
          <small>Error message</small>
        </div>
        <button class="form__btn-signin" id="button">Create Account</button>
        <p class="form__footer-text">
          Already have an account? Sign in <a href="/merchant/login" data-url>here</a>
        </p>
      </form>
    </div>
  </div>
</section>;
    `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

export default MerchantRegister;

import { ISignInPayload } from "../../@types";
import { Notification } from "../../scripts/notification";
import { navigateTo, rootElement } from "../../scripts/router";
import { loginAction } from "../../store/actions/auth";
import Component from "../Component";

class MerchantLogin extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Sign-in");
  }

  onSuccess() {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Sign in";
    button.disabled = false;
    Notification("You're Logged In");
    navigateTo("/merchant/session/retrieve");
  }
  onError(msg: string) {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Sign in";
    button.disabled = false;
    Notification(msg, "error");
  }

  handleLogin() {
    const form = document.querySelector("#form") as HTMLFormElement;
    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const button = document.querySelector("#button") as HTMLButtonElement;
    const callback = (event: Event) => {
      event.preventDefault();
      const usernameValue = username.value;
      const passwordValue = password.value;
      const payload: ISignInPayload = {
        username: usernameValue,
        password: passwordValue,
        accessType: "MERCHANT",
      };
      button.textContent = "Signinig in....";
      button.disabled = true;
      loginAction(payload, this.onSuccess, this.onError);
    };
    form.addEventListener("submit", callback);
  }

  methods() {
    this.handleLogin();
  }

  getHtml() {
    return `
    <div class="flex">
    <div class="auth-content box">
    <div class="brand">
      <img src="/cut-session.svg" alt="brand logo" class="brand__logo" />
    </div>
    <h2 class="heading">Sign in to your Merchant account</h2>
    <form class="form" id="form">
      <div class="form__input-group">
        <label for="username">Username </label>
        <input
          type="text"
          class="form__input"
          name="username"
          id="username"
          placeholder="John_doe"
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
          data-password
          placeholder="*******"
          required
          pattern="^(?!.* ).{6,}$"
        />
        <small>Error message</small>
      </div>
      <button class="form__btn-signin" id="button">Sign in</button>
      <p class="form__footer-text">
        Don't have an account yet? Create <a href="/merchant/register" data-url>here</a>
      </p>
    </form>
  </div>
</div>;
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

export default MerchantLogin;

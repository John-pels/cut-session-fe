import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Sign-in");
  }

  handleLogin() {
    const form = document.querySelector("#form") as HTMLFormElement;
    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const callback = (event: Event) => {
      const usernameValue = username.value;
      const passwordValue = password.value;
      event.preventDefault();
      try {
        console.log("hey", {
          username: usernameValue,
          password: passwordValue,
        });
      } catch (e) {}
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
    <h2 class="heading">Sign in to continue</h2>
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
      <button class="form__btn-signin">Sign in</button>
      <p class="form__footer-text">
        Don't have an account yet? Create <a href="/register" data-url>here</a>
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

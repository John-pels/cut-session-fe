import { formValidation } from "../scripts/formValidation";
import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Sign-in");
  }

  methods() {
    formValidation(true);
  }

  getHtml() {
    return `
    <div class="flex">
    <div class="auth-content">
    <div class="brand">
      <img src="/cut-session.svg" alt="brand logo" class="brand__logo" />
    </div>
    <h2 class="heading">Sign in to continue</h2>
    <form class="form" id="form">
      <div class="form__input-group">
        <label for="email">Email Address </label>
        <input
          type="email"
          class="form__input"
          name="email"
          id="email"
          placeholder="me@example.com"
          data-email
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

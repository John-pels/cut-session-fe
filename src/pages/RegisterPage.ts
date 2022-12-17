import { Notification } from "../scripts/notification";
import { rootElement } from "../scripts/router";
import Component from "./Component.js";
export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Sign-Up");
  }

  handleRegister = () => {
    const form = document.querySelector("#form") as HTMLFormElement;
    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const name = document.querySelector("#name") as HTMLInputElement;
    const dateOfBirth = document.querySelector("#dob") as HTMLInputElement;
    const email = document.querySelector("#email") as HTMLInputElement;
    const callback = (event: Event) => {
      const usernameValue = username.value;
      const passwordValue = password.value;
      const dobValue = dateOfBirth.value;
      const nameValue = name.value;
      const emailValue = email.value;
      event.preventDefault();
      try {
        console.log("hey", {
          username: usernameValue,
          password: passwordValue,
          email: emailValue,
          dob: dobValue,
          name: nameValue,
        });
        Notification("Successfully done!");
      } catch (e) {}
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
      <h2 class="heading">Create an account</h2>
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
          <label for="dob">Date of Birth</label>
          <input
            type="date"
            class="form__input"
            name="dob"
            id="dob"
            data-dob
            required
          />
          <small>Error message</small>
        </div>
        <button class="form__btn-signin">Create Account</button>
        <p class="form__footer-text">
          Already have an account? Sign in <a href="/" data-url>here</a>
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

import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Book A Session");
  }

  methods() {
    console.log("hey Book a session!", this.params.sessionId);
  }

  getHtml() {
    return `
    <section class="dashboard container-fluid">
    <header class="header">
    <div class="header__brand">
      <a href="/dashboard">
        <img
          src="/cut-session.svg"
          alt="brand logo"
          class="header__brand--logo"
        />
        <span>Cut Session</span>
      </a>
    </div>
    <div class="header__user-info">
      <span class="header__username">John_pels</span>
      <span class="header__logout">
      <a href="/" data-url>Logout</a>
      </span>
    </div>
   </header>
   <section class="book-session box">
   <h2 class="book-session__title">Book a Session</h2>
   <form class="form" id="form">
      <div class="form__input-group mb">
        <label for="title">Title </label>
        <input
          type="text"
          class="form__input"
          name="title"
          id="title"
          placeholder="Family Session"
          data-title
          required
        />
      </div>
      <div class="form__input-group mb">
        <label for="notes">Notes</label>
        <textarea
          type="text"
          rows="5"
          class="form__input"
          name="notes"
          id="notes"
          data-notes
         required
        ></textarea>
      </div>
      <button class="form__btn-signin">Book Session</button>
    </form>
   </section>
   <section class="dashboard container-fluid">
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

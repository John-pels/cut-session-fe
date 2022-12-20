import { IBookStudioSession } from "../../@types";
import { Notification } from "../../scripts/notification";
import { navigateTo, rootElement } from "../../scripts/router";
import { bookStudioSessionAction } from "../../store/actions/session";
import { getAccessToken } from "../../utils/storage";
import { withAuth } from "../../utils/withAuth";
import Component from "../Component";

class CreateStudioSession extends Component {
  constructor(params: Params) {
    super(params);
    withAuth();
    this.setTitle("Cut Session | Book A Session");
  }

  onSuccess() {
    Notification("You're Logged In");
    navigateTo("/dashboard");
  }
  onError(msg: string) {
    Notification(msg, "error");
  }

  handleGobackup() {
    const backButton = document.querySelector(
      "#back-to-studio"
    ) as HTMLSpanElement;
    backButton.addEventListener("click", () => {
      window.location.replace("/merchant/session/retrieve");
    });
  }

  handleBookSession() {
    const form = document.querySelector("#form") as HTMLFormElement;
    const button = document.querySelector("#button") as HTMLButtonElement;
    const title = document.querySelector("#title") as HTMLInputElement;
    const date = document.querySelector("#date") as HTMLInputElement;
    const notes = document.querySelector("#notes") as HTMLTextAreaElement;

    const callback = (event: Event) => {
      event.preventDefault();
      const titleValue = title.value;
      const dateValue = date.value;
      const notesValue = notes.value;
      const { userId } = getAccessToken("cs-user");

      const payload: IBookStudioSession = {
        title: titleValue,
        date: dateValue,
        notes: notesValue,
        sessionId: this.params.sessionId,
        userId: `${userId}${userId}str`,
      };

      try {
        button.textContent = "Please wait...";
        button.disabled = true;
        bookStudioSessionAction(payload, this.onSuccess, this.onError);
      } catch (e) {
        console.log(e);
      } finally {
        button.textContent = "Book Session";
        button.disabled = false;
      }
    };
    form.addEventListener("submit", callback);
  }

  methods() {
    this.handleGobackup();
    this.handleBookSession();
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
     <span class="header__username" id="back-to-studio">
      My Sessions
      </span>
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
          <label for="date">Date</label>
          <input
            type="date"
            class="form__input"
            name="date"
            id="date"
            data-date
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
      <button class="form__btn-signin" id="button">Book Session</button>
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

export default CreateStudioSession;
import { ICreateStudioSession } from "../../@types";
import { Notification } from "../../scripts/notification";
import { navigateTo, rootElement } from "../../scripts/router";
import { createStudioSessionAction } from "../../store/actions/session";
import { getAccessToken } from "../../utils/storage";
import { withAuth } from "../../utils/withAuth";
import Component from "../Component";

class CreateStudioSession extends Component {
  constructor(params: Params) {
    super(params);
    withAuth("cs-merchant");
    this.setTitle("Cut Session | Book A Session");
  }

  onSuccess() {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Create Session";
    button.disabled = false;
    Notification("You're Logged In");
    navigateTo("/merchant/dahboard");
  }
  onError(msg: string) {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Create Session";
    button.disabled = false;
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
    const startsAt = document.querySelector("#startsAt") as HTMLInputElement;
    const endsAt = document.querySelector("#endsAt") as HTMLInputElement;
    const sessionType = document.querySelector("#type") as HTMLTextAreaElement;

    startsAt.addEventListener("change", () => {
      console.log("starts At", startsAt.value);
    });
    endsAt.addEventListener("change", () => {
      console.log("ends At", endsAt.value);
    });
    sessionType.addEventListener("change", () => {
      console.log("type", sessionType.value);
    });

    const callback = (event: Event) => {
      event.preventDefault();
      button.textContent = "Creating...";
      button.disabled = true;
      const startsAtValue = startsAt.value.trim().toLowerCase();
      const endsAtValue = endsAt.value.trim().toLowerCase();
      const typeValue = sessionType.value.trim();
      const { merchantId } = getAccessToken("cs-merchant");

      const payload: ICreateStudioSession = {
        startsAt: startsAtValue,
        endsAt: endsAtValue,
        type: typeValue,
      };
      console.log("payload", { ...payload, merchantId });
      createStudioSessionAction(
        payload,
        merchantId,
        this.onSuccess,
        this.onError
      );
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
   <h2 class="book-session__title">Create a Session</h2>
   <form class="form" id="form">
      <div class="form__input-group mb">
        <label for="title">Starts At </label>
        <input
          type="time"
          class="form__input"
          name="startsAt"
          id="startsAt"
          placeholder=""
          data-startsAt
          required
        />
      </div>
       <div class="form__input-group mb">
          <label for="date">Ends At</label>
          <input
            type="time"
            class="form__input"
            name="endsAt"
            id="endsAt"
            data-endsAt
            required
          />
        </div>
      <div class="form__input-group mb">
        <label for="notes">Type</label>
        <select
          class="form__input"
          name="type"
          id="type"
          data-type
         required
        >
        <option value="WeekDay">WeekDay</option>
        <option value="WeekEnd">WeekEnd</option>
        </select>
      </div>
      <button class="form__btn-signin" id="button">Create Session</button>
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

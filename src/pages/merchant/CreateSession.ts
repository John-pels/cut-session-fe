import { ICreateStudioSession } from "../../@types";
import { Notification } from "../../scripts/notification";
import { navigateTo, rootElement } from "../../scripts/router";
import { createStudioSessionAction } from "../../store/actions/session";
import { getAccessToken } from "../../utils/storage";
import { validateTime, validateTimeSlot } from "../../utils/timeSlotValidation";
import { withAuth } from "../../utils/withAuth";
import Component from "../Component";

class CreateStudioSession extends Component {
  isFormValidated: boolean;
  constructor(params: Params) {
    super(params);
    withAuth("cs-merchant");
    this.setTitle("Cut Session | Book A Session");
    this.isFormValidated = false;
  }

  handleDisplayErrorMessage(formControl: HTMLElement, message: string) {
    const small = formControl.querySelector("small") as HTMLElement;
    if (message) {
      formControl.className = "form__input-group error";
      small.innerText = message;
      this.isFormValidated = false;
    } else {
      formControl.className = "form__input-group";
      this.isFormValidated = true;
    }
  }

  onSuccess() {
    const button = document.querySelector("#button") as HTMLButtonElement;
    button.textContent = "Create Session";
    button.disabled = false;
    Notification("Studio session created successfully!");
    navigateTo("/merchant/dashboard");
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
      window.location.replace("/merchant/dashboard");
    });
  }

  handleCreateSession() {
    const form = document.querySelector("#form") as HTMLFormElement;
    const button = document.querySelector("#button") as HTMLButtonElement;
    const startsAt = document.querySelector("#startsAt") as HTMLInputElement;
    const endsAt = document.querySelector("#endsAt") as HTMLInputElement;
    const sessionType = document.querySelector("#type") as HTMLSelectElement;
    const timeSlot = document.querySelector("#time_slot") as HTMLSelectElement;
    button.disabled = true;

    startsAt.addEventListener("change", () => {
      const formControl = startsAt.parentElement as HTMLElement;
      const message = validateTime(startsAt.value, sessionType.value);
      this.handleDisplayErrorMessage(formControl, message);
      console.log("validation", this.isFormValidated);
    });
    endsAt.addEventListener("change", () => {
      const formControl = endsAt.parentElement as HTMLElement;
      const message = validateTime(endsAt.value, sessionType.value);
      this.handleDisplayErrorMessage(formControl, message);
      console.log("validation", this.isFormValidated);
    });

    timeSlot.addEventListener("change", () => {
      const formControl = timeSlot.parentElement as HTMLElement;
      const message = validateTimeSlot(
        startsAt.value,
        endsAt.value,
        timeSlot.value
      );
      this.handleDisplayErrorMessage(formControl, message);
      console.log("validation", this.isFormValidated);
    });

    form.addEventListener("change", () => {
      if (this.isFormValidated) {
        console.log("Hey it's true");
        button.disabled = false;
      } else {
        button.disabled = true;
      }
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
        startsAt: `${startsAtValue}:00`,
        endsAt: `${endsAtValue}:00`,
        type: typeValue,
      };

      createStudioSessionAction(
        payload,
        `${merchantId}stringstring`,
        this.onSuccess,
        this.onError
      );
    };
    form.addEventListener("submit", callback);
  }

  methods() {
    this.handleGobackup();
    this.handleCreateSession();
  }

  getHtml() {
    return `
    <section class="dashboard container-fluid">
    <header class="header">
    <div class="header__brand">
      <a href="/merchant/dashboard">
        <img
          src="/cut-session.svg"
          alt="brand logo"
          class="header__brand--logo"
             width="100%"
          height="100%"
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
     <div class="form__input-group">
        <label for="type">Type</label>
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
        <small>Error message</small>
      </div>
      <div class="form__input-group">
        <label for="startsAt">Starts At </label>
        <input
          type="time"
          class="form__input"
          name="startsAt"
          id="startsAt"
          placeholder=""
          data-startsAt
          required
        />
        <small>Error message</small>
      </div>
       <div class="form__input-group">
          <label for="endsAt">Ends At</label>
          <input
            type="time"
            class="form__input"
            name="endsAt"
            id="endsAt"
            data-endsAt
            required
          />
        <small>Error message</small>
        </div>
         <div class="form__input-group">
        <label for="time_slot">Time Slot</label>
        <select
          class="form__input"
          name="time_slot"
          id="time_slot"
          data-time_slot
         required
        >
        <option disabled selected>select</option>
        <option value="45">45 minutes</option>
        <option value="60">60 minutes</option>
        <option value="90">90 minutes</option>
        </select>
        <small>Error message</small>
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

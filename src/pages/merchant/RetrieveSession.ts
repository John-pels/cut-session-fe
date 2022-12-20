import { IStudioSessions } from "../../@types";
import { Notification } from "../../scripts/notification";
import { rootElement } from "../../scripts/router";
import { getAllStudioSessionsAction } from "../../store/actions/session";
import { store } from "../../store/reducers";
import { filterDataByKeyAndValue } from "../../utils/data";
import { withAuth } from "../../utils/withAuth";
import Component from "../Component";

class RetrieveSessionsBookings extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Studio Sessions");
    withAuth();
  }

  onSuccess() {}
  onError(msg: string) {
    Notification(msg, "error");
  }

  handleGobackup() {
    const backButton = document.querySelector(
      "#back-to-studio"
    ) as HTMLSpanElement;
    backButton.addEventListener("click", () => {
      window.location.replace("/dashboard");
    });
  }

  handleFetchStudioSessions() {
    try {
      getAllStudioSessionsAction(
        this.params.merchantId,
        this.onSuccess,
        this.onError
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  renderWeekDaySessions(studioSessions: Array<IStudioSessions>) {
    const sessionGrid = document.querySelector(".session__grid") as HTMLElement;
    const sessions = studioSessions
      .map((session) => {
        return `
        <a href="/dashboard/book/${session.id}" data-url key=${session.id}>
        <div class="session__time">${session.startsAt} - ${session.endsAt}</div>
        </a>`;
      })
      .join("");

    sessionGrid.innerHTML =
      sessions.length === 0
        ? `<p>No weeekday sessions available</p>`
        : sessions;
  }

  renderWeekEndSessions(studioSessions: Array<IStudioSessions>) {
    const sessionGrid = document.querySelector(
      ".weekend-session"
    ) as HTMLElement;
    const sessions = studioSessions
      .map((session) => {
        return `
         <a href="/dashboard/book/${session.id}" data-url key=${session.id}>
        <div class="session__time">${session.startsAt} - ${session.endsAt}</div>
        </a>`;
      })
      .join("");
    sessionGrid.innerHTML =
      sessions.length === 0
        ? `<div>No weekend sessions available</div>`
        : sessions;
  }

  methods() {
    store.subscribe(() => {
      const state = store.getState();
      const weekendSessions = filterDataByKeyAndValue(
        state.sessions,
        "type",
        "weekEnd"
      );
      const weekdaySessions = filterDataByKeyAndValue(
        state.sessions,
        "type",
        "weekDay"
      );

      this.renderWeekDaySessions(weekdaySessions);
      this.renderWeekEndSessions(weekendSessions);
      this.handleGobackup();
    });
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
      Studios
      </span>
      <span class="header__logout">
      <a href="/" data-url>Logout</a>
      </span>
    </div>
   </header>

   <section class="studio-session">
   <h2 class="session__title">Weekday Sessions</h2>
   <div class="session__grid"><p class="text-center">Loading...</p></div>
   </section>

   <section class="studio-session">
   <h2 class="session__title">Weekend Sessions</h2>
   <div class="session__grid weekend-session"><p class="text-center">Loading...</p></div>
   </section>
  <section class="dashboard container-fluid">
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
    this.handleFetchStudioSessions();
  }
}

export default RetrieveSessionsBookings;

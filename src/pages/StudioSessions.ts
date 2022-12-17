import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Studio Sessions");
  }

  renderWeekDaySessions() {
    const data = [...new Array(8)];
    const sessionGrid = document.querySelector(".session__grid") as HTMLElement;
    const sessions = data
      .map((_, index) => {
        return `
        <a href="/dashboard/book/439548kfjdnlk" data-url key=${index}>
        <div class="session__time">14:45:22Z - 16:23:21Z</div>
        </a>`;
      })
      .join("");
    sessionGrid.innerHTML = sessions;
  }

  renderWeekEndSessions() {
    const data = [...new Array(8)];
    const sessionGrid = document.querySelector(
      ".weekend-session"
    ) as HTMLElement;
    const sessions = data
      .map((_, index) => {
        return `
        <a href="/dashboard/book/439548kfjdnlk" data-url key=${index}>
        <div class="session__time">14:45:22Z - 16:23:21Z</div>
        </a>`;
      })
      .join("");
    sessionGrid.innerHTML = sessions;
  }

  methods() {
    this.renderWeekDaySessions();
    this.renderWeekEndSessions();
    console.log("Params", this.params.merchantId);
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

   <section class="studio-session">
   <h2 class="session__title">Weekday Sessions</h2>
   <div class="session__grid"></div>
   </section>

   <section class="studio-session">
   <h2 class="session__title">Weekend Sessions</h2>
   <div class="session__grid weekend-session"></div>
   </section>
  <section class="dashboard container-fluid">
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

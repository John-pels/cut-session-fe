import { Notification } from "../scripts/notification";
import { navigateTo, rootElement } from "../scripts/router";
import { getAllStudiosAction } from "../store/actions/studio";
import { clearToken } from "../utils/storage";
import Component from "./Component";
import { IClients } from "../@types";
import { store } from "../store/reducers";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Dashboard");
  }
  isLoading = false;

  onSuccess() {
    console.log("fetch success");
  }
  onError(msg: string) {
    Notification(msg, "error");
  }

  handleLogout() {
    const logoutButton = document.querySelector("#logout") as HTMLSpanElement;
    logoutButton.addEventListener("click", () => {
      clearToken();
      navigateTo("/");
    });
  }
  handleFetchStudios() {
    try {
      this.isLoading = true;
      getAllStudiosAction(
        "?type=USER&limit=20&offset=1",
        this.onSuccess,
        this.onError
      );
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  renderStudios(allStudios: Array<IClients>) {
    const grid = document.querySelector(".studio-grid") as HTMLElement;
    const studios = allStudios
      .map((studio) => {
        return `
      <a href=dashboard/studio/${studio.merchantId} data-url key=${studio.merchantId}>
      <div class="studio-grid__item">
        <div class="studio-grid__item">
          <img
            src="/studio_image.jpg"
            alt="studio Image"
            class="studio-image"
          />
          <div class="studio__content">
            <code class="studio-name">
              <b>Name</b>: ${studio.name} studio
            </code>
            <code class="studio-name">
              <b>Location:</b> ${studio.cityOfOperation}
            </code>
             <code class="studio-name">
              <b>Email:</b> ${studio.email}
            </code>
          </div>
        </div>
      </div>
    </a>
      `;
      })
      .join("");

    grid.innerHTML = this.isLoading
      ? `<div>Loading...<div>`
      : studios.length === 0
      ? `<p>No studios available</p>`
      : studios;
  }

  methods() {
    store.subscribe(() => {
      const state = store.getState();
      this.renderStudios(state.studios);
    });
    this.handleLogout();
    this.handleFetchStudios();
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
      <span class="header__logout" id="logout">
       Logout
      </span>
    </div>
  </header>
  <section class="dashboard__search">
    <form class="dashboard__search--form">
      <input
        type="text"
        class="dashboard__search--input"
        placeholder="search studios by name or city..."
      />
      <button class="dashboard__search--btn">Search</button>
    </form>
  </section>
  <section class="studio-grid"></section>
</section>;
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

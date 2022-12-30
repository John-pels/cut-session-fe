import { Notification } from "../scripts/notification";
import { navigateTo, rootElement } from "../scripts/router";
import { getAllStudiosAction } from "../store/actions/studio";
import { clearToken } from "../utils/storage";
import Component from "./Component";
import { IClients } from "../@types";
import { store } from "../store/reducers";
import { withAuth } from "../utils/withAuth";

class Dashboard extends Component {
  constructor(params: Params) {
    super(params);
    withAuth();
    this.setTitle("Cut Session | Dashboard");
  }

  onSuccess() {
    const searchBtn = document.querySelector(
      "#search-btn"
    ) as HTMLButtonElement;
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
  onError(msg: string) {
    Notification(msg, "error");
  }

  loader = `<p class="text-center">Loading...</p>`;

  handleLogout() {
    const logoutButton = document.querySelector("#logout") as HTMLSpanElement;
    logoutButton.addEventListener("click", () => {
      clearToken();
      navigateTo("/");
    });
  }

  handleSearchByNameAndCity() {
    const searchForm = document.querySelector(
      ".dashboard__search--form"
    ) as HTMLFormElement;
    const merchantName = document.querySelector("#name") as HTMLInputElement;
    const merchantCity = document.querySelector("#city") as HTMLInputElement;
    const grid = document.querySelector("#grid") as HTMLElement;
    const searchBtn = document.querySelector(
      "#search-btn"
    ) as HTMLButtonElement;

    searchForm.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      const merchantNameValue = merchantName.value.trim().toLowerCase();
      const merchantCityValue = merchantCity.value.trim().toLowerCase();
      let queries: string = "";
      if (merchantCityValue && merchantNameValue) {
        queries = `name=${merchantNameValue}&city=${merchantCityValue}`;
      }
      if (merchantCityValue && !merchantNameValue) {
        queries = `city=${merchantCityValue}`;
      }
      if (!merchantCityValue && merchantNameValue) {
        queries = `city=${merchantNameValue}`;
      }
      if (!merchantCityValue && !merchantNameValue) {
        queries = "";
      }

      searchBtn.textContent = "Searching...";
      searchBtn.disabled = true;
      grid.innerHTML = this.loader;
      grid.classList.remove("studio-grid");
      this.handleFetchStudios(queries);
      merchantName.value = "";
      merchantCity.value = "";
      console.log("queries", queries);
    });
  }
  handleFetchStudios(queries = "") {
    try {
      getAllStudiosAction(
        `?type=MERCHANT&limit=50&offset=1&${queries}`,
        this.onSuccess,
        this.onError
      );
    } catch (e) {
      console.log(e);
    }
  }

  renderStudios(allStudios: Array<IClients>) {
    const grid = document.querySelector("#grid") as HTMLElement;
    const filterMerchants = allStudios.filter(
      (merchant) => merchant["merchantId"] !== undefined
    );
    const studios = filterMerchants
      .map((studio) => {
        return `
      <a href=dashboard/studio/${studio.merchantId} data-url key=${studio.merchantId}>
      <div class="studio-grid__item">
        <div class="studio-grid__item">
        <div class="studio-img-wrapper">
         <img
            src="/studio_image.jpg"
            alt="studio Image"
            class="studio-image"
               width="100%"
               height="100%"
          />
        </div>  
          <div class="studio__content">
            <code class="studio-name">
              <b>Name</b>: ${studio.name} studio
            </code>
            <code class="studio-name">
              <b>City:</b> ${studio.cityOfOperation}
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
    grid.classList.add("studio-grid");
    grid.innerHTML =
      studios.length === 0
        ? `<p class="text-center">No studios available</p>`
        : studios;
  }

  methods() {
    store.subscribe(() => {
      const state = store.getState();
      this.renderStudios(state.studios);
    });
    this.handleLogout();
    this.handleFetchStudios();
    this.handleSearchByNameAndCity();
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
          width="100%"
          height="100%"
        />
        <span>Cut Session</span>
      </a>
    </div>
    <div class="header__user-info">
      <span class="header__logout" id="logout">
       Logout
      </span>
    </div>
  </header>
  <section class="dashboard__search">
    <form class="dashboard__search--form">
      <input
        type="text"
        name="name"
        id="name"
        class="dashboard__search--input"
        placeholder="search studios by name"
      />
        <input
        type="text"
        name="city"
        id="city"
        class="dashboard__search--input"
        placeholder="search studios by city"
      />
      <button class="dashboard__search--btn" id="search-btn">Search</button>
    </form>
  </section>
  <section id="grid"><p class="text-center">Loading...</p></section>
</section>;
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

export default Dashboard;

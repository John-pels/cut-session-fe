import { ISessionBookings } from "../../@types";
import { Notification } from "../../scripts/notification";
import { rootElement } from "../../scripts/router";
import { retrieveSessionBookingsAction } from "../../store/actions/session";
import { store } from "../../store/reducers";
import { withAuth } from "../../utils/withAuth";
import Component from "../Component";

class RetrieveSessionsBookings extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Studio Sessions");
    withAuth("cs-merchant");
  }
  defaultQuery = `?limit=50&offset=1&`;
  loader = `<p class="text-center">Loading...</p>`;

  onSuccess() {
    const button = document.querySelector("#search-btn") as HTMLButtonElement;
    button.textContent = "Search";
    button.disabled = false;
  }
  onError(msg: string) {
    const allBookings = document.querySelector(
      ".session__bookings"
    ) as HTMLElement;
    const button = document.querySelector("#search-btn") as HTMLButtonElement;
    button.textContent = "Search";
    button.disabled = false;
    allBookings.innerHTML = `<p class="text-center">Something went wrong, please refresh</p>`;
    Notification(msg, "error");
  }

  handleSearchSessionBookings() {
    const form = document.querySelector(
      ".bookings_search-form"
    ) as HTMLFormElement;
    const allBookings = document.querySelector(
      ".session__bookings"
    ) as HTMLElement;
    const name = document.querySelector("#name") as HTMLInputElement;
    const city = document.querySelector("#city") as HTMLInputElement;
    const period = document.querySelector("#period") as HTMLSelectElement;
    const startDate = document.querySelector("#startDate") as HTMLInputElement;
    const endDate = document.querySelector("#endDate") as HTMLInputElement;
    const button = document.querySelector("#search-btn") as HTMLButtonElement;
    const endDateGroup = document.querySelector(
      "#end-date-group"
    ) as HTMLInputElement;
    const singleDateLabel = document.querySelector(
      "#single-date"
    ) as HTMLLabelElement;
    console.log(period.value);
    singleDateLabel.textContent = "Date:";
    endDateGroup.style.display = "none";
    endDateGroup.style.display = "none";
    period.addEventListener("change", () => {
      if (period.value === "single") {
        singleDateLabel.textContent = "Date:";
        endDateGroup.style.display = "none";
      } else {
        singleDateLabel.textContent = "Start Date:";
        endDateGroup.style.display = "flex";
      }
    });

    const callback = (event: Event) => {
      event.preventDefault();
      allBookings.innerHTML = this.loader;
      const nameValue = name.value.trim().toLowerCase();
      const cityValue = city.value.trim().toLowerCase();
      const startDateValue = startDate.value.trim().toLowerCase();
      const endDateValue = endDate.value.trim().toLowerCase();
      button.textContent = "Searching...";
      button.disabled = true;
      let queries: string = "";
      if (!endDateValue) {
        queries = `city=${
          cityValue || "lagos"
        }&name=${nameValue}&period=${startDateValue}`;
      } else {
        queries = `city=${
          cityValue || "lagos"
        }&name=${nameValue}&period=${startDateValue}:${endDateValue}`;
      }
      console.log(queries);
      retrieveSessionBookingsAction(
        `${this.defaultQuery}${queries}`,
        this.onSuccess,
        this.onError
      );
    };

    form.addEventListener("submit", callback);
    name.value = "";
    city.value = "";
    startDate.value = "";
    endDate.value = "";
  }

  handleFetchSessionBookings() {
    retrieveSessionBookingsAction(
      `${this.defaultQuery}&city=lagos`,
      this.onSuccess,
      this.onError
    );
  }

  renderSessionBookings(bookings: Array<ISessionBookings>) {
    const allBookings = document.querySelector(
      ".session__bookings"
    ) as HTMLElement;

    const tableRow = bookings
      .map(({ date, bookingId, startsAt, endsAt }, index) => {
        return `
        <tr>
        <td>${index + 1}</td>
        <td>${new Date(date).toLocaleDateString()}</td>
        <td>${bookingId}</td>
        <td>${startsAt}</td>
        <td>${endsAt}</td>
        <td id="view">View</td>
   </tr>`;
      })
      .join("");

    const tableData = `
     <table class="booking__table">
       <thead>
         <tr>
            <th>S/N</th>
            <th>Date</th>
            <th>ID</th>
            <th>Starts At</th>
            <th>Ends At</th>
            <th>Action</th>
          </tr>
        </thead>
            <tbody id="table-body">
            ${tableRow}
            </tbody>
    </table>
    `;

    allBookings.innerHTML =
      bookings.length === 0
        ? `<div class="text-center">No session bookings available</div>`
        : tableData;
  }

  methods() {
    this.handleFetchSessionBookings();
    store.subscribe(() => {
      const state = store.getState();
      this.renderSessionBookings(state.sessionBookings);
      this.handleSearchSessionBookings();
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
    <a href="/merchant/session/create" data-url> Create Session</a>
      <span class="header__logout">
      <a href="/merchant/login" data-url>Logout</a>
      </span>
    </div>
   </header>

   <section class="studio-session">
   <h2 class="session__title">My Session Bookings</h2>
   <form class="bookings_search-form">
       <div class="form__input-group">
        <label for="password">Name or Id:</label>
       <input
        type="text"
        name="name"
        id="name"
        class="form__input"
        placeholder="search by name or id"
        data-name   
      />
      </div>
          <div class="form__input-group">
        <label for="password">City:</label>
        <input
        type="text"
        name="city"
        id="city"
        class="form__input"
        data-city   
        placeholder="search by city"
      />
      </div>
      <div class="form__input-group">
        <label for="password">Period:</label>
        <select class="form__input" name="period" id="period">
        <option value="single">Single</option>
        <option value="double">Double</option>
        </select>
        </div>
          <div class="form__input-group">
        <label for="password" id="single-date">Start Date:</label>
      <input
            type="date"
            class="form__input"
            name="startDate"
            id="startDate"
            data-startDate   
          />
          </div>
        <div class="form__input-group" id="end-date-group">
        <label for="password">End Date:</label>
           <input
            type="date"
            class="form__input"
            name="endDate"
            id="endDate"
            data-endDate
          />
       </div>
       </div>
      <div class="form__input-group">
        <label>&nbsp;</label>
      <button class="form__btn-signin no-margin" id="search-btn">Search</button>
      </div>
   </form>
   <div class="session__bookings">
   ${this.loader}
   </div>
   </section>
  <section class="dashboard container-fluid">
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.methods();
  }
}

export default RetrieveSessionsBookings;

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
  loader = `<p class="text-center">Loading...</p>`;
  onSuccess() {}
  onError(msg: string) {
    Notification(msg, "error");
  }

  handleFetchSessionBookings() {
    retrieveSessionBookingsAction(
      `?limit=50&offset=1&city=lagos`,
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
      console.log("store", state);
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

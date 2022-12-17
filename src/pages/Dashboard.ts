import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Dashboard");
  }

  renderStudios() {
    const data = [...new Array(10)];
    const grid = document.querySelector(".studio-grid") as HTMLElement;
    const studios = data
      .map((_, index) => {
        return `
      <a href="dashboard/studio/235jksmn3598dkdk" data-url key=${index}>
      <div class="studio-grid__item">
        <div class="studio-grid__item">
          <img
            src="/studio_image.jpg"
            alt="studio Image"
            class="studio-image"
          />
          <div class="studio__content">
            <code class="studio-name">
              <b>Name</b>: Pendulum Studio
            </code>
            <code class="studio-name">
              <b>Location:</b> No.5 Sir Bobby Street, Manchester, UK.
            </code>
          </div>
        </div>
      </div>
    </a>
      `;
      })
      .join("");

    grid.innerHTML = studios;
  }

  methods() {
    console.log("hey man!");
    this.renderStudios();
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

import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Studio Sessions");
  }

  method() {
    console.log("Params", this.params.merchantId);
  }

  getHtml() {
    return `
      <section>Studio Sessions</section>
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.method();
  }
}

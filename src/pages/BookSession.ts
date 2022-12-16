import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | Book A Session");
  }

  method() {
    console.log("hey man!");
  }

  getHtml() {
    return `
    <section>Book A Session</section>
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.method();
  }
}

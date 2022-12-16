import { rootElement } from "../scripts/router";
import Component from "./Component.js";

export default class extends Component {
  constructor(params: Params) {
    super(params);
    this.setTitle("Cut Session | 404 Page");
  }

  method() {
    console.log("hey man!");
  }

  getHtml() {
    return `
    <section>Oooppps! Page Not Found!</section>
     `;
  }

  render() {
    rootElement.innerHTML = this.getHtml();
    this.method();
  }
}

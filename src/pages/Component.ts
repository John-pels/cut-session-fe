export default class Component {
  params: Params;
  constructor(params: Params) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
  }

  getHtml() {
    return "";
  }

  render() {}
}

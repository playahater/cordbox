export default class Device {

  constructor(name, event) {
    this.name = name;
    this.event = event;
  }

  start() {
    document.addEventListener(this.name, this.event, false);
  }

  distroy() {
    document.removeEventListener(this.name, this.event, false);
  }

}

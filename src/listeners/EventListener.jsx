class EventListener {

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

export default EventListener;

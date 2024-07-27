
export default class Mediator {
  observers: Array<{
    event: string,
    callback: Function,
  }>;

  constructor() {
    this.observers = [];
  }

  on(event: string, callback: Function) {
    this.observers.push({ event, callback });
  }

  publish(event: string, data: any) {
    for (const observer of this.observers) {
      if (observer.event === event) {
        observer.callback(data);
      }
    }
  }
}

export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};

    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach(observer => observer(val));
          }
        }
      });
    }
  }

  // 상태 변경 구독!
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb];
  }
}

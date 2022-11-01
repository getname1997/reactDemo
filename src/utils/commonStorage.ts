class CommonLocalStorage {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  set(key: string, value: any) {
    return this.storage.setItem(`${key}`, value);
  }
  get(key: string) {
    return this.storage.getItem(`${key}`);
  }
  del(key: string) {
    return this.storage.removeItem(`${key}`);
  }
  clear() {
    this.storage.clear();
  }
}

const commonStorage = new CommonLocalStorage();

export default commonStorage;

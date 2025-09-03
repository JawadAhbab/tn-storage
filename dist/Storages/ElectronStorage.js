'use strict';

var Store = require('electron-store');
var tnValidate = require('tn-validate');
const store = new Store();
class ElectronStorage {
  scope;
  constructor(scope) {
    this.scope = `@storage.${scope}`;
  }
  save(object) {
    store.set(this.scope, object);
  }
  getStoreObject() {
    const object = store.get(this.scope);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
}
exports.ElectronStorage = ElectronStorage;

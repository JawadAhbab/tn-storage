'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var Store = require('electron-store');
var tnValidate = require('tn-validate');
const store = new Store();
class ElectronStorage {
  constructor(scope) {
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
  }
  save(object) {
    store.set(this.scope, object);
  }
  getSavedobj() {
    const object = store.get(this.scope);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
}
exports.ElectronStorage = ElectronStorage;

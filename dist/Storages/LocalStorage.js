'use strict';

var tnValidate = require('tn-validate');
class LocalStorage {
  scope;
  async = false;
  constructor(scope) {
    this.scope = `@storage.${scope}`;
  }
  save(object) {
    localStorage.setItem(this.scope, JSON.stringify(object));
  }
  getStoreObject() {
    const string = localStorage.getItem(this.scope);
    if (!tnValidate.isJson(string)) return {};
    const object = JSON.parse(string);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
}
exports.LocalStorage = LocalStorage;

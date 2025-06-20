'use strict';

var tnValidate = require('tn-validate');
class SessionStorage {
  scope;
  async = false;
  constructor(scope) {
    this.scope = `@storage.${scope}`;
  }
  save(object) {
    sessionStorage.setItem(this.scope, JSON.stringify(object));
  }
  getSavedobj() {
    const string = sessionStorage.getItem(this.scope);
    if (!tnValidate.isJson(string)) return {};
    const object = JSON.parse(string);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
}
exports.SessionStorage = SessionStorage;

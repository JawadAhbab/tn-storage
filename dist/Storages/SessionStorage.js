'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnValidate = require('tn-validate');
class SessionStorage {
  constructor(scope) {
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
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

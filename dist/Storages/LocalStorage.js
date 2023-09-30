'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnValidate = require('tn-validate');
class LocalStorage {
  constructor(scope) {
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
  }
  save(object) {
    localStorage.setItem(this.scope, JSON.stringify(object));
  }
  getSavedobj() {
    const string = localStorage.getItem(this.scope);
    if (!tnValidate.isJson(string)) return {};
    const object = JSON.parse(string);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
}
exports.LocalStorage = LocalStorage;

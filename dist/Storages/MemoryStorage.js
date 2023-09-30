'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
class MemoryStorage {
  constructor() {
    _defineProperty(this, "async", false);
    _defineProperty(this, "getSavedobj", () => ({}));
  }
  $connect() {}
  save() {}
}
exports.MemoryStorage = MemoryStorage;

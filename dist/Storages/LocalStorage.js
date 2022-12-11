'use strict';

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnValidate = require('tn-validate');
var LocalStorage = /*#__PURE__*/function () {
  function LocalStorage(scope) {
    _classCallCheck(this, LocalStorage);
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
  }
  _createClass(LocalStorage, [{
    key: "save",
    value: function save(object) {
      localStorage.setItem(this.scope, JSON.stringify(object));
    }
  }, {
    key: "getSavedobj",
    value: function getSavedobj() {
      var string = localStorage.getItem(this.scope);
      if (!tnValidate.isJson(string)) return {};
      var object = JSON.parse(string);
      if (!tnValidate.isObject(object)) return {};
      return object;
    }
  }]);
  return LocalStorage;
}();
exports.LocalStorage = LocalStorage;

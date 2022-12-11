'use strict';

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnValidate = require('tn-validate');
var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage(scope) {
    _classCallCheck(this, SessionStorage);
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
  }
  _createClass(SessionStorage, [{
    key: "save",
    value: function save(object) {
      sessionStorage.setItem(this.scope, JSON.stringify(object));
    }
  }, {
    key: "getSavedobj",
    value: function getSavedobj() {
      var string = sessionStorage.getItem(this.scope);
      if (!tnValidate.isJson(string)) return {};
      var object = JSON.parse(string);
      if (!tnValidate.isObject(object)) return {};
      return object;
    }
  }]);
  return SessionStorage;
}();
exports.SessionStorage = SessionStorage;

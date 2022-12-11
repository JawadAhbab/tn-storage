'use strict';

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var Store = require('electron-store');
var tnValidate = require('tn-validate');
var store = new Store();
var ElectronStorage = /*#__PURE__*/function () {
  function ElectronStorage(scope) {
    _classCallCheck(this, ElectronStorage);
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", false);
    this.scope = "@storage.".concat(scope);
  }
  _createClass(ElectronStorage, [{
    key: "save",
    value: function save(object) {
      store.set(this.scope, object);
    }
  }, {
    key: "getSavedobj",
    value: function getSavedobj() {
      var object = store.get(this.scope);
      if (!tnValidate.isObject(object)) return {};
      return object;
    }
  }]);
  return ElectronStorage;
}();
exports.ElectronStorage = ElectronStorage;

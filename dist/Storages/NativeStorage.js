'use strict';

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnValidate = require('tn-validate');
var AsyncStorage = require('@react-native-async-storage/async-storage');
var NativeStorage = /*#__PURE__*/function () {
  function NativeStorage(scope) {
    _classCallCheck(this, NativeStorage);
    _defineProperty(this, "scope", void 0);
    _defineProperty(this, "async", true);
    this.scope = "@storage.".concat(scope);
  }
  _createClass(NativeStorage, [{
    key: "save",
    value: function save(object, callback) {
      AsyncStorage.setItem(this.scope, JSON.stringify(object)).then(function () {
        return callback && callback();
      }).catch(function (err) {
        return console.error(err);
      });
    }
  }, {
    key: "getSavedobj",
    value: function getSavedobj(callback) {
      if (!callback) return;
      AsyncStorage.getItem(this.scope).then(function (string) {
        if (!tnValidate.isJson(string)) return callback({});
        var object = JSON.parse(string);
        if (!tnValidate.isObject(object)) return callback({});
        callback(object);
      }).catch(function (err) {
        console.error(err);
        callback({});
      });
    }
  }]);
  return NativeStorage;
}();
exports.NativeStorage = NativeStorage;

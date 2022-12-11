'use strict';

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var MemoryStorage = /*#__PURE__*/function () {
  function MemoryStorage() {
    _classCallCheck(this, MemoryStorage);
    _defineProperty(this, "async", false);
    _defineProperty(this, "getSavedobj", function () {
      return {};
    });
  }
  _createClass(MemoryStorage, [{
    key: "$connect",
    value: function $connect() {}
  }, {
    key: "save",
    value: function save() {}
  }]);
  return MemoryStorage;
}();
exports.MemoryStorage = MemoryStorage;

'use strict';

var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _createClass = require("@babel/runtime/helpers/createClass");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnReactive = require('tn-reactive');
var tnTimeout = require('tn-timeout');
var tnValidate = require('tn-validate');
var CreateStorage = /*#__PURE__*/function () {
  function CreateStorage(storage, schema) {
    var _this = this;
    _classCallCheck(this, CreateStorage);
    _defineProperty(this, "timeout", new tnTimeout.Timeout(100));
    _defineProperty(this, "storage", void 0);
    _defineProperty(this, "states", void 0);
    _defineProperty(this, "afterSave", function () {
      return null;
    });
    _defineProperty(this, "ready", new tnReactive.Reactive(false));
    this.storage = storage;
    this.states = schema;
    if (!this.storage.async) this.setupSchema(this.states, this.storage.getSavedobj());else this.storage.getSavedobj(function (saveobj) {
      return _this.setupSchema(schema, saveobj);
    });
  }
  _createClass(CreateStorage, [{
    key: "exacSave",
    value: function exacSave() {
      var _this2 = this;
      var object = this.getObject(this.states);
      if (this.storage.async) this.storage.save(object, function () {
        return _this2.afterSave();
      });else {
        this.storage.save(object);
        this.afterSave();
      }
    }
  }, {
    key: "save",
    value: function save() {
      var _this3 = this;
      if (!this.timeout) return this.exacSave();
      this.timeout.queue(function () {
        return _this3.exacSave();
      });
    }
  }, {
    key: "changeTimeout",
    value: function changeTimeout(ms) {
      this.timeout = tnValidate.isNumber(ms) ? new tnTimeout.Timeout(ms) : null;
      return this;
    }
  }, {
    key: "setAfterSave",
    value: function setAfterSave(func) {
      this.afterSave = func;
      return this;
    }
  }, {
    key: "setupSchema",
    value: function setupSchema(schema, savedobj) {
      var _this4 = this;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      if (!tnValidate.isObject(schema)) return;
      Object.entries(schema).forEach(function (entry) {
        var key = entry[0];
        var store = entry[1];
        var newpath = [].concat(_toConsumableArray(path), [key]);
        var savedval = savedobj && savedobj[key];
        if (store['$store']) store['$connect'](function () {
          return _this4.save();
        }, newpath, savedval);else _this4.setupSchema(store, savedval, newpath);
      });
      this.ready.current = true;
      this.save();
    }
  }, {
    key: "getObject",
    value: function getObject(states) {
      var _this5 = this;
      if (!tnValidate.isObject(states)) return states;
      var obj = {};
      Object.entries(states).forEach(function (entry) {
        var key = entry[0];
        var store = entry[1];
        if (store['$store']) obj[key] = store.get();else obj[key] = _this5.getObject(store);
      });
      return obj;
    }
  }, {
    key: "execSync",
    value: function execSync(schema, savedobj) {
      var _this6 = this;
      if (!tnValidate.isObject(schema)) return;
      Object.entries(schema).forEach(function (entry) {
        var key = entry[0];
        var store = entry[1];
        var savedval = savedobj && savedobj[key];
        if (store['$store']) store.set(savedval, true);else _this6.execSync(store, savedval);
      });
    }
  }, {
    key: "sync",
    value: function sync() {
      var _this7 = this;
      if (!this.storage.async) this.execSync(this.states, this.storage.getSavedobj());else this.storage.getSavedobj(function (saveobj) {
        return _this7.execSync(_this7.states, saveobj);
      });
    }
  }]);
  return CreateStorage;
}();
exports.CreateStorage = CreateStorage;

'use strict';

var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray");
var _assertThisInitialized = require("@babel/runtime/helpers/assertThisInitialized");
var _inherits = require("@babel/runtime/helpers/inherits");
var _createSuper = require("@babel/runtime/helpers/createSuper");
var _createClass = require("@babel/runtime/helpers/createClass");
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");
var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnReactive = require('tn-reactive');
var tnArrelm = require('tn-arrelm');
var tnValidate = require('tn-validate');
var deepEqual = require('fast-deep-equal');
var StoreOptions = /*#__PURE__*/_createClass(function StoreOptions(options) {
  _classCallCheck(this, StoreOptions);
  _defineProperty(this, "deepcheck", void 0);
  _defineProperty(this, "onSet", function () {
    return null;
  });
  _defineProperty(this, "onStart", function (v) {
    return v;
  });
  _defineProperty(this, "getter", function (v) {
    return v;
  });
  _defineProperty(this, "setter", function (v) {
    return v;
  });
  var _options$deepcheck = options.deepcheck,
    deepcheck = _options$deepcheck === void 0 ? false : _options$deepcheck,
    onSet = options.onSet,
    onStart = options.onStart,
    getter = options.getter,
    setter = options.setter;
  this.deepcheck = deepcheck;
  if (onSet) this.onSet = onSet;
  if (onStart !== undefined) this.onStart = tnValidate.isFunction(onStart) ? onStart : function () {
    return onStart;
  };
  if (getter !== undefined) this.getter = tnValidate.isFunction(getter) ? getter : function () {
    return getter;
  };
  if (setter !== undefined) this.setter = tnValidate.isFunction(setter) ? setter : function () {
    return setter;
  };
}); // just a typescript hack
// it actually referes to Store & StoreReactive Classes
var StoreSuperSuper = /*#__PURE__*/function () {
  function StoreSuperSuper() {
    _classCallCheck(this, StoreSuperSuper);
  }
  _createClass(StoreSuperSuper, [{
    key: "get",
    value: function get() {
      return null;
    }
  }, {
    key: "set",
    value: function set(value) {
      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return silent ? value : value;
    }
  }]);
  return StoreSuperSuper;
}();
var StoreValidator = /*#__PURE__*/function () {
  function StoreValidator(storesuper, q) {
    _classCallCheck(this, StoreValidator);
    _defineProperty(this, "validator", void 0);
    _defineProperty(this, "storesuper", void 0);
    _defineProperty(this, "question", void 0);
    this.storesuper = storesuper;
    this.question = q;
    if (!q) this.validator = function () {
      return true;
    };else if (tnValidate.isFunction(q)) this.validator = q;else if (q === 'any') this.validator = function () {
      return true;
    };else if (q === 'string') this.validator = tnValidate.isString;else if (q === 'number') this.validator = tnValidate.isNumber;else if (q === 'boolean') this.validator = tnValidate.isBoolean;else if (q === 'array') this.validator = tnValidate.isArray;else if (q === 'object') this.validator = tnValidate.isObject;else if (q === 'string[]') this.validator = function (v) {
      return tnValidate.isArray(v) && !v.map(tnValidate.isString).includes(false);
    };else if (q === 'number[]') this.validator = function (v) {
      return tnValidate.isArray(v) && !v.map(tnValidate.isNumber).includes(false);
    };else if (q === 'boolean[]') this.validator = function (v) {
      return tnValidate.isArray(v) && !v.map(tnValidate.isBoolean).includes(false);
    };else this.validator = function (v) {
      return q.includes(v);
    };
  }
  _createClass(StoreValidator, [{
    key: "validate",
    value: function validate(value) {
      var valid = this.validator(value);
      if (!valid) console.error(this.errstr(value));
      return valid;
    }
  }, {
    key: "checkDefault",
    value: function checkDefault(defaults) {
      if (this.validator(defaults)) return;
      throw new Error(this.errstr(defaults, true));
    }
  }, {
    key: "errstr",
    value: function errstr(value, defaults) {
      var lb = defaults ? '\n\n' : '\n';
      var def = defaults ? 'Default ' : '';
      var pathstr = this.storesuper['path'].join('.');
      var val = (defaults ? 'Default   : ' : 'Value     : ') + value;
      return "".concat(lb, "@storage  : ").concat(def, "Validation Error\nPath      : @storage.").concat(pathstr, "\n").concat(val, "\nQuestion  : ").concat(this.question, "\nValidator : ").concat(this.validator, "\n");
    }
  }]);
  return StoreValidator;
}();
var StoreSuper = /*#__PURE__*/function (_StoreSuperSuper) {
  _inherits(StoreSuper, _StoreSuperSuper);
  var _super = _createSuper(StoreSuper);
  function StoreSuper(defaults, ques) {
    var _this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, StoreSuper);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "$store", true);
    _defineProperty(_assertThisInitialized(_this), "$onChange", void 0);
    _defineProperty(_assertThisInitialized(_this), "validator", void 0);
    _defineProperty(_assertThisInitialized(_this), "$default", void 0);
    _defineProperty(_assertThisInitialized(_this), "union", void 0);
    _defineProperty(_assertThisInitialized(_this), "options", void 0);
    _defineProperty(_assertThisInitialized(_this), "path", void 0);
    _defineProperty(_assertThisInitialized(_this), "$connect", function ($onChange, $path, savedval) {
      _this.path = $path;
      _this.$onChange = $onChange;
      _this.validator.checkDefault(_this.$default);
      var value = savedval !== undefined ? _this.options.onStart(savedval) : _this.$default;
      if (_this.validator.validate(value)) _this.set(value, true);else _this.set(_this.$default, true);
    });
    _defineProperty(_assertThisInitialized(_this), "easyset", function (value) {
      return _this.set(value);
    });
    _this.$default = tnValidate.isFunction(defaults) ? defaults() : defaults;
    _this.validator = new StoreValidator(_assertThisInitialized(_this), ques);
    _this.options = new StoreOptions(options);
    if (tnValidate.isArray(ques)) _this.union = ques;
    return _this;
  }
  _createClass(StoreSuper, [{
    key: "execset",
    value: function execset(value) {
      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var setValue = arguments.length > 2 ? arguments[2] : undefined;
      var preval = this.get();
      var newval = this.options.setter(value);
      if (this.options.deepcheck && deepEqual(preval, newval)) return preval;
      if (!this.options.deepcheck && preval === newval) return preval;
      if (!this.validator.validate(newval)) return preval;
      setValue(newval);
      if (!silent) this.$onChange();
      return newval;
    }
  }, {
    key: "reset",
    value: function reset() {
      return this.easyset(this.$default);
    }
  }, {
    key: "increase",
    value: function increase() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.get();
      if (!tnValidate.isNumber(value)) return value;
      return this.easyset(value + amount);
    }
  }, {
    key: "decrease",
    value: function decrease() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.get();
      if (!tnValidate.isNumber(value)) return value;
      return this.easyset(value - amount);
    }
  }, {
    key: "push",
    value: function push() {
      var value = this.get();
      if (!tnValidate.isArray(value)) return value;
      for (var _len = arguments.length, elm = new Array(_len), _key = 0; _key < _len; _key++) {
        elm[_key] = arguments[_key];
      }
      return this.easyset([].concat(_toConsumableArray(value), elm));
    }
  }, {
    key: "unshift",
    value: function unshift() {
      var value = this.get();
      if (!tnValidate.isArray(value)) return value;
      for (var _len2 = arguments.length, elm = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        elm[_key2] = arguments[_key2];
      }
      return this.easyset([].concat(elm, _toConsumableArray(value)));
    }
  }, {
    key: "shift",
    value: function shift() {
      var howmany = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.get();
      if (!tnValidate.isArray(value)) return value;
      var newval = _toConsumableArray(value);
      for (var i = 0; i < howmany; i++) {
        newval.shift();
      }
      return this.easyset(newval);
    }
  }, {
    key: "pop",
    value: function pop() {
      var howmany = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.get();
      if (!tnValidate.isArray(value)) return value;
      var newval = _toConsumableArray(value);
      for (var i = 0; i < howmany; i++) {
        newval.pop();
      }
      return this.easyset(newval);
    }
  }, {
    key: "switch",
    value: function _switch() {
      var value = this.get();
      if (!tnValidate.isBoolean(value)) return value;
      return this.easyset(!value);
    }
  }, {
    key: "next",
    value: function next() {
      var value = this.get();
      if (!this.union) return value;
      return this.easyset(tnArrelm.arrNextElm(this.union, value));
    }
  }, {
    key: "prev",
    value: function prev() {
      var value = this.get();
      if (!this.union) return value;
      return this.easyset(tnArrelm.arrPrevElm(this.union, value));
    }
  }]);
  return StoreSuper;
}(StoreSuperSuper);
var StoreReactive = /*#__PURE__*/function (_StoreSuper) {
  _inherits(StoreReactive, _StoreSuper);
  var _super2 = _createSuper(StoreReactive);
  function StoreReactive(defaults, ques, options) {
    var _this2;
    _classCallCheck(this, StoreReactive);
    _this2 = _super2.call(this, defaults, ques, options);
    _defineProperty(_assertThisInitialized(_this2), "value", new tnReactive.Reactive(undefined));
    return _this2;
  }
  _createClass(StoreReactive, [{
    key: "get",
    value: function get() {
      return this.options.getter(this.value.current);
    }
  }, {
    key: "set",
    value: function set(value) {
      var _this3 = this;
      var silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var newval = this.execset(value, silent, function (value) {
        return _this3.value.current = value;
      });
      this.options.onSet(newval);
      return newval;
    }
  }]);
  return StoreReactive;
}(StoreSuper);
exports.StoreReactive = StoreReactive;

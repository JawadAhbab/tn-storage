'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
var tnArrelm = require('tn-arrelm');
var tnValidate = require('tn-validate');
var deepEqual = require('fast-deep-equal');
class StoreOptions {
  constructor(options) {
    _defineProperty(this, "deepcheck", void 0);
    _defineProperty(this, "onSet", () => null);
    _defineProperty(this, "onStart", v => v);
    _defineProperty(this, "getter", v => v);
    _defineProperty(this, "setter", v => v);
    const {
      deepcheck = false,
      onSet,
      onStart,
      getter,
      setter
    } = options;
    this.deepcheck = deepcheck;
    if (onSet) this.onSet = onSet;
    if (onStart) this.onStart = onStart;
    if (getter) this.getter = getter;
    if (setter) this.setter = setter;
  }
}

// just a typescript hack
// it actually referes to Store & StoreReactive Classes
class StoreSuperSuper {
  get() {
    return null;
  }
  set(value) {
    let silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return silent ? value : value;
  }
}
class StoreValidator {
  constructor(storesuper, q) {
    _defineProperty(this, "validator", void 0);
    _defineProperty(this, "storesuper", void 0);
    _defineProperty(this, "question", void 0);
    this.storesuper = storesuper;
    this.question = q;
    if (!q) this.validator = () => true;else if (tnValidate.isFunction(q)) this.validator = q;else if (q === 'any') this.validator = () => true;else if (q === 'string') this.validator = tnValidate.isString;else if (q === 'number') this.validator = tnValidate.isNumber;else if (q === 'boolean') this.validator = tnValidate.isBoolean;else if (q === 'array') this.validator = tnValidate.isArray;else if (q === 'object') this.validator = tnValidate.isObject;else if (q === 'string[]') this.validator = v => tnValidate.isArray(v) && !v.map(tnValidate.isString).includes(false);else if (q === 'number[]') this.validator = v => tnValidate.isArray(v) && !v.map(tnValidate.isNumber).includes(false);else if (q === 'boolean[]') this.validator = v => tnValidate.isArray(v) && !v.map(tnValidate.isBoolean).includes(false);else this.validator = v => q.includes(v);
  }
  validate(value) {
    const valid = this.validator(value);
    if (!valid) console.error(this.errstr(value));
    return valid;
  }
  checkDefault(defaults) {
    if (this.validator(defaults)) return;
    throw new Error(this.errstr(defaults, true));
  }
  errstr(value, defaults) {
    const lb = defaults ? '\n\n' : '\n';
    const def = defaults ? 'Default ' : '';
    const pathstr = this.storesuper['path'].join('.');
    const val = (defaults ? 'Default   : ' : 'Value     : ') + value;
    return "".concat(lb, "@storage  : ").concat(def, "Validation Error\nPath      : @storage.").concat(pathstr, "\n").concat(val, "\nQuestion  : ").concat(this.question, "\nValidator : ").concat(this.validator, "\n");
  }
}
class StoreSuper extends StoreSuperSuper {
  constructor(defaults, ques) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super();
    _defineProperty(this, "$store", true);
    _defineProperty(this, "$onChange", void 0);
    _defineProperty(this, "validator", void 0);
    _defineProperty(this, "$default", void 0);
    _defineProperty(this, "union", void 0);
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "path", void 0);
    _defineProperty(this, "$connect", ($onChange, $path, savedval) => {
      this.path = $path;
      this.$onChange = $onChange;
      this.validator.checkDefault(this.$default);
      const value = savedval !== undefined ? this.options.onStart(savedval) : this.$default;
      if (this.validator.validate(value)) this.set(value, true);else this.set(this.$default, true);
    });
    _defineProperty(this, "easyset", value => this.set(value));
    this.$default = tnValidate.isFunction(defaults) ? defaults() : defaults;
    this.validator = new StoreValidator(this, ques);
    this.options = new StoreOptions(options);
    if (tnValidate.isArray(ques)) this.union = ques;
  }
  execset(value) {
    let silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let setValue = arguments.length > 2 ? arguments[2] : undefined;
    const preval = this.get();
    const newval = this.options.setter(value);
    if (this.options.deepcheck && deepEqual(preval, newval)) return preval;
    if (!this.options.deepcheck && preval === newval) return preval;
    if (!this.validator.validate(newval)) return preval;
    setValue(newval);
    if (!silent) this.$onChange();
    return newval;
  }
  reset() {
    return this.easyset(this.$default);
  }
  increase() {
    let amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const value = this.get();
    if (!tnValidate.isNumber(value)) return value;
    return this.easyset(value + amount);
  }
  decrease() {
    let amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const value = this.get();
    if (!tnValidate.isNumber(value)) return value;
    return this.easyset(value - amount);
  }
  push() {
    const value = this.get();
    if (!tnValidate.isArray(value)) return value;
    for (var _len = arguments.length, elm = new Array(_len), _key = 0; _key < _len; _key++) {
      elm[_key] = arguments[_key];
    }
    return this.easyset([...value, ...elm]);
  }
  unshift() {
    const value = this.get();
    if (!tnValidate.isArray(value)) return value;
    for (var _len2 = arguments.length, elm = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      elm[_key2] = arguments[_key2];
    }
    return this.easyset([...elm, ...value]);
  }
  shift() {
    let howmany = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const value = this.get();
    if (!tnValidate.isArray(value)) return value;
    const newval = [...value];
    for (let i = 0; i < howmany; i++) newval.shift();
    return this.easyset(newval);
  }
  pop() {
    let howmany = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    const value = this.get();
    if (!tnValidate.isArray(value)) return value;
    const newval = [...value];
    for (let i = 0; i < howmany; i++) newval.pop();
    return this.easyset(newval);
  }
  switch() {
    const value = this.get();
    if (!tnValidate.isBoolean(value)) return value;
    return this.easyset(!value);
  }
  next() {
    const value = this.get();
    if (!this.union) return value;
    return this.easyset(tnArrelm.arrNextElm(this.union, value));
  }
  prev() {
    const value = this.get();
    if (!this.union) return value;
    return this.easyset(tnArrelm.arrPrevElm(this.union, value));
  }
}
class Store extends StoreSuper {
  constructor(defaults, ques, options) {
    super(defaults, ques, options);
    _defineProperty(this, "value", void 0);
  }
  get() {
    return this.options.getter(this.value);
  }
  set(value) {
    let silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const newval = this.execset(value, silent, value => this.value = value);
    this.options.onSet(newval);
    return newval;
  }
}
exports.Store = Store;

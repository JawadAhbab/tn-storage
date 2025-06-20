'use strict';

var tnReactive = require('tn-reactive');
var deepEqual = require('fast-deep-equal');
var tnArrelm = require('tn-arrelm');
var tnValidate = require('tn-validate');
var cryptoJs = require('crypto-js');
class StoreEncrypt {
  constructor(opts) {
    this.createShhh(opts === true ? undefined : opts.secret);
  }
  shhh;
  createShhh() {
    let secret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'J06AOEC52IMQC1WS5404HW82C60HBT51';
    this.shhh = secret.padEnd(32).substring(0, 32);
  }
  encrypt(data) {
    const json = JSON.stringify({
      data
    });
    return cryptoJs.AES.encrypt(json, this.shhh).toString();
  }
  decrypt(cipher) {
    try {
      const jsonstr = cryptoJs.AES.decrypt(cipher, this.shhh).toString(cryptoJs.enc.Utf8);
      const {
        data
      } = JSON.parse(jsonstr);
      return data;
    } catch {}
  }
}
class StoreOptions {
  deepcheck;
  encrypt;
  onSet = () => null;
  onStart = v => v;
  getter = v => v;
  setter = v => v;
  constructor(options) {
    const {
      deepcheck = false,
      encrypt,
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
    if (encrypt) this.encrypt = new StoreEncrypt(encrypt);
  }
}

// just a typescript hack
// it actually referes to Store & StoreReactive Classes
class StoreSuperSuper {
  /** @internal */setRawValue(_value) {}
  /** @internal */
  getRawValue() {
    return null;
  }
}
class StoreValidator {
  validator;
  storesuper;
  question;
  constructor(storesuper, q) {
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
    return `${lb}@storage  : ${def}Validation Error\nPath      : @storage.${pathstr}\n${val}\nQuestion  : ${this.question}\nValidator : ${this.validator}\n`;
  }
}
class StoreSuper extends StoreSuperSuper {
  $store = true;
  $onChange;
  validator;
  $default;
  union;
  options;
  path;
  constructor(defaults, ques) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super();
    this.$default = tnValidate.isFunction(defaults) ? defaults() : defaults;
    this.options = new StoreOptions(options);
    this.validator = new StoreValidator(this, ques);
    if (tnValidate.isArray(ques)) this.union = ques;
  }
  $connect = ($onChange, $path, storeValue) => {
    this.path = $path;
    this.$onChange = $onChange;
    this.validator.checkDefault(this.$default);
    const value = this.parseStoreValue(storeValue);
    if (this.validator.validate(value)) this.set(value, true);else this.set(this.$default, true);
  };
  easyset = value => this.set(value);
  execset(value) {
    let silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let setValue = arguments.length > 2 ? arguments[2] : undefined;
    const preval = this.get();
    let newval = this.options.setter(value);
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
  get() {
    return this.options.getter(this.getRawValue());
  }
  set(value) {
    let silent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const newval = this.execset(value, silent, value => this.setRawValue(value));
    this.options.onSet(newval);
    return newval;
  }
  /** @internal */
  getStoreValue() {
    const raw = this.getRawValue();
    return this.options.encrypt?.encrypt(raw) ?? raw;
  }
  /** @internal */
  parseStoreValue(storeValue) {
    if (storeValue === undefined) return this.$default;
    if (!this.options.encrypt) return this.options.onStart(storeValue);
    return this.options.encrypt.decrypt(storeValue) ?? this.$default;
  }
}
class StoreReactive extends StoreSuper {
  value = (() => new tnReactive.Reactive(undefined))();
  constructor(defaults, ques, options) {
    super(defaults, ques, options);
  }
  /** @internal */
  getRawValue() {
    return this.value.current;
  }
  /** @internal */
  setRawValue(value) {
    this.value.set(value);
  }
}
exports.StoreReactive = StoreReactive;

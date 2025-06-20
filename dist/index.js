'use strict';

var tnReactive = require('tn-reactive');
var tnTimeout = require('tn-timeout');
var tnValidate = require('tn-validate');
class CreateStorage {
  timeout = (() => new tnTimeout.Timeout(100))();
  storage;
  states;
  constructor(storage, schema) {
    this.storage = storage;
    this.states = schema;
    if (!this.storage.async) this.setupSchema(this.states, this.storage.getSavedobj());else this.storage.getSavedobj(saveobj => this.setupSchema(schema, saveobj));
  }
  exacSave() {
    const object = this.getObject(this.states);
    if (this.storage.async) this.storage.save(object, () => this.afterSave());else {
      this.storage.save(object);
      this.afterSave();
    }
  }
  save() {
    if (!this.timeout) return this.exacSave();
    this.timeout.queue(() => this.exacSave());
  }
  changeTimeout(ms) {
    this.timeout = tnValidate.isNumber(ms) ? new tnTimeout.Timeout(ms) : null;
    return this;
  }
  afterSave = () => null;
  setAfterSave(func) {
    this.afterSave = func;
    return this;
  }
  ready = (() => new tnReactive.Reactive(false))();
  setupSchema(schema, savedobj) {
    let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (!tnValidate.isObject(schema)) return;
    Object.entries(schema).forEach(entry => {
      const key = entry[0];
      const store = entry[1];
      const newpath = [...path, key];
      const savedval = savedobj && savedobj[key];
      if (store['$store']) store['$connect'](() => this.save(), newpath, savedval);else this.setupSchema(store, savedval, newpath);
    });
    this.ready.current = true;
    this.save();
  }
  getObject(states) {
    if (!tnValidate.isObject(states)) return states;
    const obj = {};
    Object.entries(states).forEach(entry => {
      const key = entry[0];
      const store = entry[1];
      if (store['$store']) obj[key] = store.get();else obj[key] = this.getObject(store);
    });
    return obj;
  }
  execSync(schema, savedobj) {
    if (!tnValidate.isObject(schema)) return;
    Object.entries(schema).forEach(entry => {
      const key = entry[0];
      const store = entry[1];
      const savedval = savedobj && savedobj[key];
      if (store['$store']) store.set(savedval, true);else this.execSync(store, savedval);
    });
  }
  sync() {
    if (!this.storage.async) this.execSync(this.states, this.storage.getSavedobj());else this.storage.getSavedobj(saveobj => this.execSync(this.states, saveobj));
  }
}
exports.CreateStorage = CreateStorage;

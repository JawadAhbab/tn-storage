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
    if (!this.storage.async) this.setupSchema(this.states, this.storage.getStoreObject());else this.storage.getStoreObject(saveobj => this.setupSchema(schema, saveobj));
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
  setupSchema(schema, storeObject) {
    let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (!tnValidate.isObject(schema)) return;
    Object.entries(schema).forEach(entry => {
      const key = entry[0];
      const store = entry[1];
      const newpath = [...path, key];
      const storeValue = storeObject && storeObject[key];
      if (store['$store']) store['$connect'](() => this.save(), newpath, storeValue);else this.setupSchema(store, storeValue, newpath);
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
      if (store['$store']) obj[key] = store.getStoreValue();else obj[key] = this.getObject(store);
    });
    return obj;
  }
  execSync(schema, storeObject) {
    if (!tnValidate.isObject(schema)) return;
    Object.entries(schema).forEach(entry => {
      const key = entry[0];
      const store = entry[1];
      const storeValue = storeObject && storeObject[key];
      if (store['$store']) store.set(storeValue, true);else this.execSync(store, storeValue);
    });
  }
  sync() {
    if (!this.storage.async) this.execSync(this.states, this.storage.getStoreObject());else this.storage.getStoreObject(storeObject => this.execSync(this.states, storeObject));
  }
}
exports.CreateStorage = CreateStorage;

'use strict';

var reactNativeMmkv = require('react-native-mmkv');
var tnValidate = require('tn-validate');
const storage = new reactNativeMmkv.MMKV();
class NativeStorage {
  scope;
  constructor(scope) {
    this.scope = `@storage.${scope}`;
  }
  save(object) {
    storage.set(this.scope, JSON.stringify(object));
  }
  getStoreObject() {
    const string = storage.getString(this.scope);
    if (!tnValidate.isJson(string)) return {};
    const object = JSON.parse(string);
    if (!tnValidate.isObject(object)) return {};
    return object;
  }
  clearStorage() {
    storage.delete(this.scope);
  }
}
exports.NativeStorage = NativeStorage;

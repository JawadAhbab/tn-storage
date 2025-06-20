'use strict';

var tnValidate = require('tn-validate');
var AsyncStorage = require('@react-native-async-storage/async-storage');
class NativeStorage {
  scope;
  async = true;
  constructor(scope) {
    this.scope = `@storage.${scope}`;
  }
  save(object, callback) {
    AsyncStorage.setItem(this.scope, JSON.stringify(object)).then(() => callback && callback()).catch(err => console.error(err));
  }
  getStoreObject(callback) {
    if (!callback) return;
    AsyncStorage.getItem(this.scope).then(string => {
      if (!tnValidate.isJson(string)) return callback({});
      const object = JSON.parse(string);
      if (!tnValidate.isObject(object)) return callback({});
      callback(object);
    }).catch(err => {
      console.error(err);
      callback({});
    });
  }
}
exports.NativeStorage = NativeStorage;

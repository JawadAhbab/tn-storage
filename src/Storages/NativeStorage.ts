import { MMKV } from 'react-native-mmkv'
import { isJson, isObject } from 'tn-validate'
const storage = new MMKV()

export class NativeStorage {
  private scope: string
  constructor(scope: string) {
    this.scope = `@storage.${scope}`
  }

  public save(object: any) {
    storage.set(this.scope, JSON.stringify(object))
  }

  public getStoreObject() {
    const string = storage.getString(this.scope)
    if (!isJson(string)) return {}
    const object = JSON.parse(string)
    if (!isObject(object)) return {}
    return object
  }

  public clearStorage() {
    storage.delete(this.scope)
  }
}

import { isJson, isObject } from 'tn-validate'

export class LocalStorage {
  private scope: string
  constructor(scope: string) {
    this.scope = `@storage.${scope}`
  }

  public save(object: any) {
    localStorage.setItem(this.scope, JSON.stringify(object))
  }

  public getStoreObject() {
    const string = localStorage.getItem(this.scope)
    if (!isJson(string)) return {}
    const object = JSON.parse(string)
    if (!isObject(object)) return {}
    return object
  }
}

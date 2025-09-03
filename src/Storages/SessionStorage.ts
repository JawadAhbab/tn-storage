import { isJson, isObject } from 'tn-validate'

export class SessionStorage {
  private scope: string
  constructor(scope: string) {
    this.scope = `@storage.${scope}`
  }

  public save(object: any) {
    sessionStorage.setItem(this.scope, JSON.stringify(object))
  }

  public getStoreObject() {
    const string = sessionStorage.getItem(this.scope)
    if (!isJson(string)) return {}
    const object = JSON.parse(string)
    if (!isObject(object)) return {}
    return object
  }
}

import Store from 'electron-store'
import { isObject } from 'tn-validate'
const store = new Store()

export class ElectronStorage {
  private scope: string
  public async = false
  constructor(scope: string) {
    this.scope = `@storage.${scope}`
  }

  public save(object: any) {
    store.set(this.scope, object)
  }

  public getSavedobj() {
    const object = store.get(this.scope)
    if (!isObject(object)) return {}
    return object
  }
}

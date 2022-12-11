import { AnyObject } from 'tn-typescript'
import { isJson, isObject } from 'tn-validate'
import AsyncStorage from '@react-native-async-storage/async-storage'
type SetCallback = () => void
type GetCallback = (saveobj: AnyObject) => void

export class NativeStorage {
  private scope: string
  public async = true
  constructor(scope: string) {
    this.scope = `@storage.${scope}`
  }

  public save(object: any, callback?: SetCallback) {
    AsyncStorage.setItem(this.scope, JSON.stringify(object))
      .then(() => callback && callback())
      .catch(err => console.error(err))
  }

  public getSavedobj(callback?: GetCallback) {
    if (!callback) return
    AsyncStorage.getItem(this.scope)
      .then(string => {
        if (!isJson(string)) return callback({})
        const object = JSON.parse(string)
        if (!isObject(object)) return callback({})
        callback(object)
      })
      .catch(err => {
        console.error(err)
        callback({})
      })
  }
}

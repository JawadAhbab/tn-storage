import { Reactive } from 'tn-reactive'
import { Timeout } from 'tn-timeout'
import { AnyObject, Func } from 'tn-typescript'
import { isNumber, isObject } from 'tn-validate'
import { Storages, Stores } from './accessories/Typings'

export class CreateStorage<T extends object = any> {
  private timeout: Timeout | null = new Timeout(100)
  private storage: Storages
  public states: T
  constructor(storage: Storages, schema: T) {
    this.storage = storage
    this.states = schema
    if (!this.storage.async) this.setupSchema(this.states, this.storage.getSavedobj())
    else this.storage.getSavedobj(saveobj => this.setupSchema(schema, saveobj))
  }

  private exacSave() {
    const object = this.getObject(this.states)
    if (this.storage.async) this.storage.save(object, () => this.afterSave())
    else {
      this.storage.save(object)
      this.afterSave()
    }
  }

  private save() {
    if (!this.timeout) return this.exacSave()
    this.timeout.queue(() => this.exacSave())
  }

  public changeTimeout(ms: number | null) {
    this.timeout = isNumber(ms) ? new Timeout(ms) : null
    return this
  }

  private afterSave: Func = () => null
  public setAfterSave(func: Func) {
    this.afterSave = func
    return this
  }

  public ready = new Reactive(false)
  private setupSchema(schema: T, savedobj: any, path: string[] = []) {
    if (!isObject(schema)) return
    Object.entries(schema).forEach(entry => {
      const key = entry[0]
      const store = entry[1] as Stores
      const newpath = [...path, key]
      const savedval = savedobj && savedobj[key]
      if (store['$store']) store['$connect'](() => this.save(), newpath, savedval)
      else this.setupSchema(store as T, savedval, newpath)
    })
    this.ready.current = true
    this.save()
  }

  private getObject(states: object) {
    if (!isObject(states)) return states
    const obj: AnyObject = {}
    Object.entries(states).forEach(entry => {
      const key = entry[0]
      const store = entry[1] as Stores
      if (store['$store']) obj[key] = store.getStoreValue()
      else obj[key] = this.getObject(store)
    })
    return obj
  }

  private execSync(schema: T, savedobj: any) {
    if (!isObject(schema)) return
    Object.entries(schema).forEach(entry => {
      const key = entry[0]
      const store = entry[1] as Stores
      const savedval = savedobj && savedobj[key]
      if (store['$store']) store.set(savedval, true)
      else this.execSync(store as T, savedval)
    })
  }

  public sync() {
    if (!this.storage.async) this.execSync(this.states, this.storage.getSavedobj())
    else this.storage.getSavedobj(saveobj => this.execSync(this.states, saveobj))
  }
}

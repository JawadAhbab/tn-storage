import deepEqual from 'fast-deep-equal'
import { arrNextElm, arrPrevElm } from 'tn-arrelm'
import { Func } from 'tn-typescript'
import { isArray, isBoolean, isFunction, isNumber } from 'tn-validate'
import { StoreOptions, StoreOptobj } from './StoreOptions'
import { StoreSuperSuper } from './StoreSuperSuper'
import { StoreValidator } from './StoreValidator'
import { Question, VUnion } from './Typings'
type Connect<T> = ($onChange: Func, $path: string[], storeValue?: T) => void

export class StoreSuper<T> extends StoreSuperSuper<T> {
  protected $store = true
  protected $onChange!: Func
  protected validator: StoreValidator<T>
  protected $default: T
  protected union?: VUnion
  protected options: StoreOptions<T>
  protected path!: string[]

  constructor(defaults: T | (() => T), ques?: Question<T>, options: StoreOptobj<T> = {}) {
    super()
    this.$default = isFunction(defaults) ? defaults() : defaults
    this.options = new StoreOptions(options)
    this.validator = new StoreValidator(this, ques)
    if (isArray(ques)) this.union = ques
  }

  protected $connect: Connect<T> = ($onChange, $path, storeValue) => {
    this.path = $path
    this.$onChange = $onChange
    this.validator.checkDefault(this.$default)
    const value = this.parseStoreValue(storeValue)
    if (this.validator.validate(value)) this.set(value, true)
    else this.set(this.$default, true)
  }

  protected easyset = (value: any) => this.set(value)
  protected execset(value: T, silent = false, setValue: (value: T) => void) {
    const preval = this.get()
    let newval = this.options.setter(value)
    if (this.options.deepcheck && deepEqual(preval, newval)) return preval
    if (!this.options.deepcheck && preval === newval) return preval
    if (!this.validator.validate(newval)) return preval
    setValue(newval)
    if (!silent) this.$onChange()
    return newval
  }

  public reset() {
    return this.easyset(this.$default)
  }

  public increase(amount = 1) {
    const value = this.get()
    if (!isNumber(value)) return value
    return this.easyset(value + amount)
  }
  public decrease(amount = 1) {
    const value = this.get()
    if (!isNumber(value)) return value
    return this.easyset(value - amount)
  }
  public push(...elm: (T extends any[] ? T[number] : T)[]) {
    const value = this.get()
    if (!isArray(value)) return value
    return this.easyset([...value, ...elm])
  }
  public unshift(...elm: (T extends any[] ? T[number] : T)[]) {
    const value = this.get()
    if (!isArray(value)) return value
    return this.easyset([...elm, ...value])
  }
  public shift(howmany = 1) {
    const value = this.get()
    if (!isArray(value)) return value
    const newval = [...value]
    for (let i = 0; i < howmany; i++) newval.shift()
    return this.easyset(newval)
  }
  public pop(howmany = 1) {
    const value = this.get()
    if (!isArray(value)) return value
    const newval = [...value]
    for (let i = 0; i < howmany; i++) newval.pop()
    return this.easyset(newval)
  }
  public switch() {
    const value = this.get()
    if (!isBoolean(value)) return value
    return this.easyset(!value)
  }
  public next() {
    const value = this.get()
    if (!this.union) return value
    return this.easyset(arrNextElm(this.union, value as any))
  }
  public prev() {
    const value = this.get()
    if (!this.union) return value
    return this.easyset(arrPrevElm(this.union, value as any))
  }

  public get() {
    return this.options.getter(this.getRawValue())
  }
  public set(value: T, silent = false) {
    const newval = this.execset(value, silent, value => this.setRawValue(value))
    this.options.onSet(newval)
    return newval
  }

  /** @internal */ public getStoreValue() {
    const raw = this.getRawValue()
    return this.options.encrypt?.encrypt(raw) ?? raw
  }
  /** @internal */ public parseStoreValue(storeValue?: T) {
    if (storeValue === undefined) return this.$default
    if (!this.options.encrypt) return this.options.onStart(storeValue)
    return this.options.encrypt.decrypt(storeValue) ?? this.$default
  }
}

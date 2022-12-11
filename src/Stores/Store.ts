import { StoreOptobj } from '../accessories/StoreOptions'
import { StoreSuper } from '../accessories/StoreSuper'
import { Question } from '../accessories/Typings'

export class Store<T = any> extends StoreSuper<T> {
  public value!: T
  constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>) {
    super(defaults, ques, options)
  }

  public get() {
    return this.options.getter(this.value)
  }

  public set(value: T, silent = false) {
    const newval = this.execset(value, silent, value => (this.value = value))
    this.options.onSet(newval)
    return newval
  }
}

import { Reactive } from 'tn-reactive'
import { StoreOptobj } from '../accessories/StoreOptions'
import { StoreSuper } from '../accessories/StoreSuper'
import { Question } from '../accessories/Typings'

export class StoreReactive<T = any> extends StoreSuper<T> {
  public value = new Reactive<T>(undefined!)
  constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>) {
    super(defaults, ques, options)
  }

  public get() {
    return this.options.getter(this.value.current)
  }

  public set(value: T, silent = false) {
    const newval = this.execset(value, silent, value => (this.value.current = value))
    this.options.onSet(newval)
    return newval
  }
}

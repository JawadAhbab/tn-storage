import { Reactive } from 'tn-reactive'
import { StoreOptobj } from '../accessories/StoreOptions'
import { StoreSuper } from '../accessories/StoreSuper'
import { Question } from '../accessories/Typings'

export class StoreReactive<T = any> extends StoreSuper<T> {
  public value = new Reactive<T>(undefined!)
  constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>) {
    super(defaults, ques, options)
  }
  /** @internal */ public getRawValue() {
    return this.value.current
  }
  /** @internal */ public setRawValue(value: T) {
    this.value.set(value)
  }
}

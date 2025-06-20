import { StoreOptobj } from '../accessories/StoreOptions'
import { StoreSuper } from '../accessories/StoreSuper'
import { Question } from '../accessories/Typings'

export class Store<T = any> extends StoreSuper<T> {
  public value!: T
  constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>) {
    super(defaults, ques, options)
  }
  /** @internal */ public getRawValue() {
    return this.value
  }
  /** @internal */ public setRawValue(value: T) {
    this.value = value
  }
}

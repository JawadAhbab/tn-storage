// just a typescript hack
// it actually referes to Store & StoreReactive Classes

export class StoreSuperSuper<T> {
  /** @internal */ public setRawValue(_value: T) {}
  /** @internal */ public getRawValue(): T {
    return null!
  }
}

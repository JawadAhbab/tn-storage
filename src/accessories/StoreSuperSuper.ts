// just a typescript hack
// it actually referes to Store & StoreReactive Classes

export class StoreSuperSuper<T> {
  public get(): T {
    return null as any
  }
  public set(value: T, silent = false): T {
    return silent ? value : value
  }
}

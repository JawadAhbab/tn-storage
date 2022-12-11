import { isFunction } from 'tn-validate'
type StoreOptfunc<T> = (value: T) => T
export interface StoreOptobj<T> {
  deepcheck?: boolean
  onSet?: (value: T) => void
  onStart?: StoreOptfunc<T> | undefined | T
  getter?: StoreOptfunc<T> | undefined | T
  setter?: StoreOptfunc<T> | undefined | T
}

export class StoreOptions<T> {
  public deepcheck: boolean
  public onSet: (value: T) => void = () => null
  public onStart: StoreOptfunc<T> = v => v
  public getter: StoreOptfunc<T> = v => v
  public setter: StoreOptfunc<T> = v => v

  constructor(options: StoreOptobj<T>) {
    const { deepcheck = false, onSet, onStart, getter, setter } = options
    this.deepcheck = deepcheck
    if (onSet) this.onSet = onSet
    if (onStart !== undefined) this.onStart = isFunction(onStart) ? onStart : () => onStart
    if (getter !== undefined) this.getter = isFunction(getter) ? getter : () => getter
    if (setter !== undefined) this.setter = isFunction(setter) ? setter : () => setter
  }
}

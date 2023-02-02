import { isFunction } from 'tn-validate'
type OnStart<T> = (value: T) => T
type Getter<T> = (value: any) => T
type Setter<T> = (value: T) => any
export interface StoreOptobj<T> {
  deepcheck?: boolean
  onSet?: (value: T) => void
  onStart?: OnStart<T> | undefined | T
  getter?: Getter<T> | undefined | T
  setter?: Setter<T> | undefined | T
}

export class StoreOptions<T> {
  public deepcheck: boolean
  public onSet: (value: T) => void = () => null
  public onStart: OnStart<T> = v => v
  public getter: Getter<T> = v => v as any
  public setter: Setter<T> = v => v as any

  constructor(options: StoreOptobj<T>) {
    const { deepcheck = false, onSet, onStart, getter, setter } = options
    this.deepcheck = deepcheck
    if (onSet) this.onSet = onSet
    if (onStart !== undefined) this.onStart = isFunction(onStart) ? onStart : () => onStart
    if (getter !== undefined) this.getter = isFunction(getter) ? getter : () => getter
    if (setter !== undefined) this.setter = (isFunction(setter) ? setter : () => setter) as Setter<T>
  }
}

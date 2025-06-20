type OnStart<T> = (value: T) => T
type Getter<T> = (value: any) => T
type Setter<T> = (value: T) => any
type EncryptOpt = false | { secret: string }
export interface StoreOptobj<T> {
  deepcheck?: boolean
  encrypted?: boolean | { secret: string }
  onSet?: (value: T) => void
  onStart?: OnStart<T>
  getter?: Getter<T>
  setter?: Setter<T>
}

export class StoreOptions<T> {
  public deepcheck: boolean
  public encrypted: EncryptOpt
  public onSet: (value: T) => void = () => null
  public onStart: OnStart<T> = v => v
  public getter: Getter<T> = v => v as any
  public setter: Setter<T> = v => v as any

  constructor(options: StoreOptobj<T>) {
    const { deepcheck = false, encrypted = false, onSet, onStart, getter, setter } = options
    const secret = '::TNSTORAGE::'
    this.deepcheck = deepcheck
    this.encrypted = encrypted === true ? { secret } : encrypted
    if (onSet) this.onSet = onSet
    if (onStart) this.onStart = onStart
    if (getter) this.getter = getter
    if (setter) this.setter = setter
  }
}

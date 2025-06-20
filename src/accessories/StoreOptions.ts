import { StoreEncrypt, StoreEncryptOpts } from './StoreEncrypt'
type OnStart<T> = (value: T) => T
type Getter<T> = (value: any) => T
type Setter<T> = (value: T) => any
export interface StoreOptobj<T> {
  deepcheck?: boolean
  encrypt?: StoreEncryptOpts | false
  onSet?: (value: T) => void
  onStart?: OnStart<T>
  getter?: Getter<T>
  setter?: Setter<T>
}

export class StoreOptions<T> {
  public deepcheck: boolean
  public encrypt?: StoreEncrypt
  public onSet: (value: T) => void = () => null
  public onStart: OnStart<T> = v => v
  public getter: Getter<T> = v => v as any
  public setter: Setter<T> = v => v as any

  constructor(options: StoreOptobj<T>) {
    const { deepcheck = false, encrypt, onSet, onStart, getter, setter } = options
    this.deepcheck = deepcheck
    if (onSet) this.onSet = onSet
    if (onStart) this.onStart = onStart
    if (getter) this.getter = getter
    if (setter) this.setter = setter
    if (encrypt) this.encrypt = new StoreEncrypt(encrypt)
  }
}

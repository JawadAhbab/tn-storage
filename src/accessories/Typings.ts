import { ElectronStorage } from '../Storages/ElectronStorage'
import { LocalStorage } from '../Storages/LocalStorage'
import { MemoryStorage } from '../Storages/MemoryStorage'
import { NativeStorage } from '../Storages/NativeStorage'
import { SessionStorage } from '../Storages/SessionStorage'
import { Store } from '../Stores/Store'
import { StoreReactive } from '../Stores/StoreReactive'

export type Stores = Store | StoreReactive
export type Storages =
  | LocalStorage
  | SessionStorage
  | MemoryStorage
  | ElectronStorage
  | NativeStorage

type Boolee = boolean | number | string | undefined | null
export type VFunc<T> = (value: T) => Boolee
export type VUnion = readonly (string | number | boolean)[]
export type Question<T> = VType | VFunc<T> | VUnion | null
export type VType =
  | 'any'
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'string[]'
  | 'number[]'
  | 'boolean[]'

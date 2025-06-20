import { CreateStorage } from './index'
import { LocalStorage } from './Storages/LocalStorage'

const { states } = new CreateStorage(new LocalStorage('myscope'), {})

// @ts-ignore
globalThis.$states = states

import { CreateStorage } from './index'
import { LocalStorage } from './Storages/LocalStorage'
import { Store } from './Stores/Store'
interface Treasure {
  foo: string
  bar: number
}

const { states } = new CreateStorage(new LocalStorage('myscope'), {
  b: new Store<any>(null, 'any', {
    encrypt: true,
  }),
})

// @ts-ignore
globalThis.$states = states
console.log(states)

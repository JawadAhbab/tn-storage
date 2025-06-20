import { CreateStorage } from './index'
import { LocalStorage } from './Storages/LocalStorage'
import { Store } from './Stores/Store'
interface Treasure {
  foo: string
  bar: number
}

const { states } = new CreateStorage(new LocalStorage('myscope'), {
  a: new Store<Treasure>(
    {
      foo: 'bar',
      bar: 11,
    },
    'object',
    {
      encrypt: true,
    }
  ),
})

// @ts-ignore
globalThis.$states = states
console.log(states)

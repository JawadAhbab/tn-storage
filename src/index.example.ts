import { CreateStorage } from './index'
import { LocalStorage } from './Storages/LocalStorage'
import { Store } from './Stores/Store'
interface Treasure {
  foo: string
  bar: number
}

const { states } = new CreateStorage(new LocalStorage('myscope'), {
  abc: new Store<Treasure>(
    {
      foo: 'bar',
      bar: 11,
    },
    'object',
    {
      encrypted: true,
      // setter: () => ({ foo: 'YESS', bar: 1000 }),
      getter: () => ({ foo: 'MINU', bar: 1000 }),
    }
  ),
})

// @ts-ignore
globalThis.$states = states
console.log(states)

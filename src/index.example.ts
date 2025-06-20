import { CreateStorage } from './index'
import { LocalStorage } from './Storages/LocalStorage'
import { Store } from './Stores/Store'
interface Treasure {
  foo: string
  bar: number
}

const { states } = new CreateStorage(new LocalStorage('myscope'), {
  treasure: new Store<number>(245, 'any', {
    onSet: v => {
      return 111
    },
  }),
})

// @ts-ignore
globalThis.$states = states
console.log(states)

import { CreateStorage } from '../src/index'
import { LocalStorage } from '../src/Storage/LocalStorage'
import { Store } from '../src/Store/Store'

const { states } = new CreateStorage(new LocalStorage('myscope'), {
  width: new Store(600, 'number'),
  height: new Store(500, 'number'),
  age: new Store(20, age => age >= 0),
  inside: {
    name: new Store('turna', 'string'),
    jobs: new Store(['marketing'], 'string[]'),
  },
})

globalThis.$states = states

```ts
const $states = new CreateStorage(new LocalStorage('myscope'), {
  width: new Store(600, 'number'),
  height: new Store(500, 'number'),
  inside: {
    name: new Store('turna', 'string'),
    jobs: new Store(['marketing'], 'string[]'),
  },
}).states
```

## Storages

`import {} from 'tn-storage/Storages/<STORAGE>'`

- `LocalStorage`
- `SessionStorage`
- `MemoryStorage`
- `ElectronStorage`
- `NativeStorage`

## Stores

`import {} from 'tn-storage/Stores/<STORE>'`

- `Store`
- `StoreReactive`

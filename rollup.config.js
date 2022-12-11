const typescript = require('rollup-plugin-typescript2')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const fs = require('fs')
const pkg = require('./package.json')

const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
const tsplug = function (declaration = false) {
  return typescript({
    useTsconfigDeclarationDir: declaration,
    tsconfigOverride: { compilerOptions: { declaration } },
  })
}
const babelplug = function (runtime = true, esm = true) {
  return getBabelOutputPlugin({
    presets: ['@babel/preset-env'],
    plugins: runtime ? [['@babel/plugin-transform-runtime', { useESModules: esm, version: '7.10.5' }]] : [],
  })
}

const storages = fs.readdirSync('./src/Storages/').map(file => ({
  input: `./src/Storages/${file}`,
  external,
  output: { file: `dist/Storages/${file.replace(/\.ts$/g, '.js')}`, format: 'cjs' },
  plugins: [tsplug(), babelplug(true, false)],
}))
const stores = fs.readdirSync('./src/Stores/').map(file => ({
  input: `./src/Stores/${file}`,
  external,
  output: { file: `dist/Stores/${file.replace(/\.ts$/g, '.js')}`, format: 'cjs' },
  plugins: [tsplug(), babelplug(true, false)],
}))

module.exports = [
  {
    input: './src/index.ts',
    external,
    output: { file: 'dist/index.js', format: 'cjs' },
    plugins: [tsplug(true), babelplug(true, false)],
  },
  ...storages,
  ...stores,
]

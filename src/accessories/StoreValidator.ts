import { isArray, isBoolean, isFunction, isNumber, isObject, isString } from 'tn-validate'
import { StoreSuper } from './StoreSuper'
import { Question, VFunc } from './Typings'

export class StoreValidator<T> {
  private validator: VFunc<T>
  private storesuper: StoreSuper<T>
  private question?: Question<T>
  constructor(storesuper: StoreSuper<T>, q?: Question<T>) {
    this.storesuper = storesuper
    this.question = q
    if (!q) this.validator = () => true
    else if (isFunction(q)) this.validator = q
    else if (q === 'any') this.validator = () => true
    else if (q === 'string') this.validator = isString
    else if (q === 'number') this.validator = isNumber
    else if (q === 'boolean') this.validator = isBoolean
    else if (q === 'array') this.validator = isArray
    else if (q === 'object') this.validator = isObject
    else if (q === 'string[]') this.validator = v => isArray(v) && !v.map(isString).includes(false)
    else if (q === 'number[]') this.validator = v => isArray(v) && !v.map(isNumber).includes(false)
    else if (q === 'boolean[]') this.validator = v => isArray(v) && !v.map(isBoolean).includes(false)
    else this.validator = v => q.includes(v as any)
  }

  public validate(value: any) {
    const valid = this.validator(value)
    if (!valid) console.error(this.errstr(value))
    return valid
  }

  public checkDefault(defaults: any) {
    if (this.validator(defaults)) return
    throw new Error(this.errstr(defaults, true))
  }

  private errstr(value: any, defaults?: boolean) {
    const lb = defaults ? '\n\n' : '\n'
    const def = defaults ? 'Default ' : ''
    const pathstr = this.storesuper['path'].join('.')
    const val = (defaults ? 'Default   : ' : 'Value     : ') + value
    return `${lb}@storage  : ${def}Validation Error\nPath      : @storage.${pathstr}\n${val}\nQuestion  : ${this.question}\nValidator : ${this.validator}\n`
  }
}

import { StoreOptobj } from '../accessories/StoreOptions';
import { StoreSuper } from '../accessories/StoreSuper';
import { Question } from '../accessories/Typings';
export declare class Store<T = any> extends StoreSuper<T> {
    value: T;
    constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>);
    get(): T;
    set(value: T, silent?: boolean): T;
}

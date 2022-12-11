import { Func } from 'tn-typescript';
import { StoreOptions, StoreOptobj } from './StoreOptions';
import { StoreSuperSuper } from './StoreSuperSuper';
import { StoreValidator } from './StoreValidator';
import { VUnion, Question } from './Typings';
type Connect<T> = ($onChange: Func, $path: string[], savedval?: T) => void;
export declare class StoreSuper<T> extends StoreSuperSuper<T> {
    protected $store: boolean;
    protected $onChange: Func;
    protected validator: StoreValidator<T>;
    protected $default: T;
    protected union?: VUnion;
    protected options: StoreOptions<T>;
    protected path: string[];
    constructor(defaults: T | (() => T), ques?: Question<T>, options?: StoreOptobj<T>);
    protected $connect: Connect<T>;
    protected easyset: (value: any) => T;
    protected execset(value: T, silent: boolean | undefined, setValue: (value: T) => void): T;
    reset(): T;
    increase(amount?: number): T;
    decrease(amount?: number): T;
    push(...elm: (T extends any[] ? T[number] : T)[]): T;
    unshift(...elm: (T extends any[] ? T[number] : T)[]): T;
    shift(howmany?: number): T;
    pop(howmany?: number): T;
    switch(): T;
    next(): T;
    prev(): T;
}
export {};

type StoreOptfunc<T> = (value: T) => T;
export interface StoreOptobj<T> {
    deepcheck?: boolean;
    onSet?: (value: T) => void;
    onStart?: StoreOptfunc<T> | undefined | T;
    getter?: StoreOptfunc<T> | undefined | T;
    setter?: StoreOptfunc<T> | undefined | T;
}
export declare class StoreOptions<T> {
    deepcheck: boolean;
    onSet: (value: T) => void;
    onStart: StoreOptfunc<T>;
    getter: StoreOptfunc<T>;
    setter: StoreOptfunc<T>;
    constructor(options: StoreOptobj<T>);
}
export {};

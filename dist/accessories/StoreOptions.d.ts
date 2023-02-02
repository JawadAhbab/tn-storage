type OnStart<T> = (value: T) => T;
type Getter<T> = (value: any) => T;
type Setter<T> = (value: T) => any;
export interface StoreOptobj<T> {
    deepcheck?: boolean;
    onSet?: (value: T) => void;
    onStart?: OnStart<T> | undefined | T;
    getter?: Getter<T> | undefined | T;
    setter?: Setter<T> | undefined | T;
}
export declare class StoreOptions<T> {
    deepcheck: boolean;
    onSet: (value: T) => void;
    onStart: OnStart<T>;
    getter: Getter<T>;
    setter: Setter<T>;
    constructor(options: StoreOptobj<T>);
}
export {};

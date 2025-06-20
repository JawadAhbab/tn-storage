import { StoreEncrypt, StoreEncryptOpts } from './StoreEncrypt';
type OnStart<T> = (value: T) => T;
type Getter<T> = (value: any) => T;
type Setter<T> = (value: T) => any;
export interface StoreOptobj<T> {
    deepcheck?: boolean;
    encrypt?: StoreEncryptOpts | false;
    onSet?: (value: T) => void;
    onStart?: OnStart<T>;
    getter?: Getter<T>;
    setter?: Setter<T>;
}
export declare class StoreOptions<T> {
    deepcheck: boolean;
    encrypt?: StoreEncrypt;
    onSet: (value: T) => void;
    onStart: OnStart<T>;
    getter: Getter<T>;
    setter: Setter<T>;
    constructor(options: StoreOptobj<T>);
}
export {};

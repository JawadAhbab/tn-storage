type OnStart<T> = (value: T) => T;
type Getter<T> = (value: any) => T;
type Setter<T> = (value: T) => any;
type EncryptOpt = false | {
    secret: string;
};
export interface StoreOptobj<T> {
    deepcheck?: boolean;
    encrypted?: boolean | {
        secret: string;
    };
    onSet?: (value: T) => void;
    onStart?: OnStart<T>;
    getter?: Getter<T>;
    setter?: Setter<T>;
}
export declare class StoreOptions<T> {
    deepcheck: boolean;
    encrypted: EncryptOpt;
    onSet: (value: T) => void;
    onStart: OnStart<T>;
    getter: Getter<T>;
    setter: Setter<T>;
    constructor(options: StoreOptobj<T>);
}
export {};

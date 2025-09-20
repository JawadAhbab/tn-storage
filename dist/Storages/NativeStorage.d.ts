export declare class NativeStorage {
    private scope;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): import("tn-typescript").AnyObject;
    clearStorage(): void;
}

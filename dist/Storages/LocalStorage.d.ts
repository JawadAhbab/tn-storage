export declare class LocalStorage {
    private scope;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): import("tn-typescript").AnyObject;
}

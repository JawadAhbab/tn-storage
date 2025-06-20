export declare class LocalStorage {
    private scope;
    async: boolean;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): import("tn-typescript").AnyObject;
}

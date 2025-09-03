export declare class SessionStorage {
    private scope;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): import("tn-typescript").AnyObject;
}

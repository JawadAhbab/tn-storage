export declare class ElectronStorage {
    private scope;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): Record<string, unknown>;
}

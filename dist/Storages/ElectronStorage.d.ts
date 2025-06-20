export declare class ElectronStorage {
    private scope;
    async: boolean;
    constructor(scope: string);
    save(object: any): void;
    getStoreObject(): Record<string, unknown>;
}

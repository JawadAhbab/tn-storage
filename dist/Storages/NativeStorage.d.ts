import { AnyObject } from 'tn-typescript';
type SetCallback = () => void;
type GetCallback = (saveobj: AnyObject) => void;
export declare class NativeStorage {
    private scope;
    async: boolean;
    constructor(scope: string);
    save(object: any, callback?: SetCallback): void;
    getSavedobj(callback?: GetCallback): void;
}
export {};

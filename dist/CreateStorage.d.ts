import { Reactive } from 'tn-reactive';
import { Func } from 'tn-typescript';
import { Storages } from './accessories/Typings';
export declare class CreateStorage<T extends object = any> {
    private timeout;
    private storage;
    states: T;
    constructor(storage: Storages, schema: T);
    private exacSave;
    private save;
    changeTimeout(ms: number | null): this;
    private afterSave;
    setAfterSave(func: Func): this;
    ready: Reactive<boolean>;
    private setupSchema;
    private getObject;
    private execSync;
    sync(): void;
}

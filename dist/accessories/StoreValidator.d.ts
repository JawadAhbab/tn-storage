import { StoreSuper } from './StoreSuper';
import { Question } from './Typings';
export declare class StoreValidator<T> {
    private validator;
    private storesuper;
    private question?;
    constructor(storesuper: StoreSuper<T>, q?: Question<T>);
    validate(value: any): string | number | boolean | null | undefined;
    checkDefault(defaults: any): void;
    private errstr;
}

export type StoreEncryptOpts = true | {
    secret: string;
};
export declare class StoreEncrypt {
    constructor(opts: StoreEncryptOpts);
    private shhh;
    private createShhh;
    encrypt(data: any): string;
    decrypt(cipher: any): any;
}

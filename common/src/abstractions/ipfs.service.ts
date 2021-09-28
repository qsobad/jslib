
export abstract class IpfsService {
    vaultCid: string;
    account: string;
    loggedin: boolean;
    test: () => any;
    login: () => Promise<boolean>;
    logout: () => any;
    clearVaultCid: () => any;
    getSync: () => any;
    postCipher: (r: any) => any;
    postCipherCreate: (r: any) => any;
    putCipher: (id: string, r: any) => any;
    deleteCipher: (id: string) => Promise<boolean>;
    putDeleteCipher: (id: string) => Promise<boolean>;
    putRestoreCipher: (id: string) => any;
    postFolder: (r: any) => any;
    putFolder: (id: string, r: any) => any;
}

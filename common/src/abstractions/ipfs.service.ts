
export abstract class IpfsService {
    vaultCid: string;
    account: string;
    loggedin: boolean;
    test: () => any;
    login: () => Promise<boolean>;
    logout: () => any;
    getSync: () => any;
    postCipher: (r: any) => any;
}

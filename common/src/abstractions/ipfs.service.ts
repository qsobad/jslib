
export abstract class IpfsService {
    vaultCid: string;
    account: string;
    loggedin: boolean;
    login: () => Promise<boolean>;
    logout: () => any;
    getSync: () => any;
    test: () => any;
}

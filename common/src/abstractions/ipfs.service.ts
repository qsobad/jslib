
export abstract class IpfsService {
    vaultCid: string;
    account: string;
    login: () => Promise<boolean>;
    logout: () => any;
    test: () => any;
}

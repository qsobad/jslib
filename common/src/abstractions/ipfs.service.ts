
export abstract class IpfsService {
    vaultCid: string;
    account: string;
    login: () => Promise<boolean>;
    test: () => any;
}

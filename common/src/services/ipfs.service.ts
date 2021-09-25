import { Utils } from '../misc/utils';
import { BrowserApi } from '../../../../src/browser/browserApi';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { IpfsService as IpfsServiceAbstraction } from '../abstractions/ipfs.service';
import {
    encrypt as ethEncrypt
} from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

export class IpfsService implements IpfsServiceAbstraction {
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkRjQzZjJmNmVFQmVmZmMzNEEzYTk0NzRGRDk1OEFDMTQ3ZjdiMmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIyMDY3NTc5MTUsIm5hbWUiOiJ0aWFuY2hpIn0.RqVsEe2aYLUkm5kdqW7tiTAdEj_i0uv854BuITXXm7Q';
    private storage: Web3Storage;
    private ethutil: any;
    private provider: any;
    private account : string;
    private encryptionPublicKey: string;
    public loggedin: boolean;
    public vaultCid: string;

    constructor() {
        console.log('ipfs construct()');

        this.storage = new Web3Storage({ token: this.token });

        const createMetaMaskProvider = require('metamask-extension-provider');
        this.provider = createMetaMaskProvider();
        this.provider.on('error', (error) => {
            console.error(error);
            BrowserApi.reloadExtension(null);
        });

        this.ethutil = require('ethereumjs-util');

        this.loggedin = false;

    }

    async init() {
        console.log('ipfs init()');

        // await this.login().then( bSuccess => {
        //     if (bSuccess) {
        //         this.logined = true;
        //         console.log('login metamask succeed.');
        //     } else {
        //         console.error('login metamask failed.');
        //     }
        // });

    }

    async test() {
        console.log('ipfs test()');

        if (this.account != null) {
            const cid = await this.saveVault('{"hello": "world"}');
            console.log('files status: ', await this.storage.status(cid));

            //const vault = await this.getVault(this.vaultCid);
            const vault = await this.getVault('bafybeid44p3k2ykbkub7oiq3alhfhmnxu2mgkv4qh2dyszps6v4yxewjga');
            console.log('vault retrived: ', vault);
        }
    }

    async login() {
        const bSuccess: boolean = false;

        if (this.provider.isMetaMask) {
            if (this.account != null && this.encryptionPublicKey != null && this.provider.isConnected()) {
                return true;
            }

            const accounts = await this.provider.request({method: 'eth_requestAccounts'});

            if (this.provider.isConnected()) {
                this.account = accounts[0];
                console.log('metamask connected:', this.account);

                await this.getPublicKey();
                if (this.encryptionPublicKey != null) {
                    this.loggedin = true;
                    return true;
                }
            }

        }

        this.account = null;
        this.encryptionPublicKey = null;
        this.loggedin = false;
        return false;

    }

    logout() {
        this.account = null;
        this.encryptionPublicKey = null;
        this.loggedin = false;
        console.log('metamask logged out');
    }

    async getPublicKey() {
        if (this.encryptionPublicKey != null) {
            return true;
        }

        try {
            const encryptionPublicKey = await this.provider.request({
                method: 'eth_getEncryptionPublicKey',
                params: [this.account], // you must have access to the specified account
            });

            this.encryptionPublicKey = encryptionPublicKey;
            console.log("encryption pubilc key:", this.encryptionPublicKey);
            return true;

        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log("We can't encrypt anything without the key.");
            } else {
                console.error(error);
            }
        }
        return false;
    }

    async saveVault (vault: string) {
        const message : string = await this.encryptVault(this.encryptionPublicKey, vault);

        const files = [
            this.makeFileObject('vault', message),
        ];

        const cid = await this.storage.put(files);
        console.log('Content added with CID:', cid);
        this.vaultCid = cid;
        return cid;
    }

    async getVault (cid: string) {
        const res = await this.storage.get(cid);
        if (res.ok) {
            const files = await res.files();
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if(file.name === 'vault') {
                    const message: string = await file.text();
                    const vault: string = await this.decryptVault(message);
                    return vault;
                }
            }
        } else {
            console.error('cannot get files with cid: ', this.vaultCid);
            return;
        }
    }

    makeFileObject (objName: string, objString: string) {
        const blob = new Blob([objString], {type : 'application/json'});

        const file = new File([blob], objName);
        return file;
    }

    async encryptVault (publicKey: string, vault: string) {
        if (this.encryptionPublicKey == null) {
            await this.getPublicKey();
        }
        const encryptedMessage = bufferToHex(
            Buffer.from(
                JSON.stringify(
                    ethEncrypt({
                        publicKey: publicKey,
                        data: vault,
                        version: 'x25519-xsalsa20-poly1305'}
                        )
                ),
                'utf8'
            )
        );
        return encryptedMessage;
    }

    async decryptVault (encryptedVault: string) {
        if (this.account == null) {
            await this.login();
        }

        const message = await this.provider.request({
            method: 'eth_decrypt',
            params: [encryptedVault, this.account],
        });
        return message;
    }

}

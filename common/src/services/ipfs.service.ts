import { Utils } from '../misc/utils';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { IpfsService as IpfsServiceAbstraction } from '../abstractions/ipfs.service';
import {
    encrypt as ethEncrypt,
} from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

export class IpfsService implements IpfsServiceAbstraction {
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkRjQzZjJmNmVFQmVmZmMzNEEzYTk0NzRGRDk1OEFDMTQ3ZjdiMmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIyMDY3NTc5MTUsIm5hbWUiOiJ0aWFuY2hpIn0.RqVsEe2aYLUkm5kdqW7tiTAdEj_i0uv854BuITXXm7Q';
    private storage: Web3Storage;
    private ethutil: any;
    private provider: any;
    private account : string;
    private encryptionPublicKey: string;

    constructor() {
        console.log('ipfs construct...');
        this.storage = new Web3Storage({ token: this.token });

        const createMetaMaskProvider = require('metamask-extension-provider');
        this.provider = createMetaMaskProvider();

        this.ethutil = require('ethereumjs-util');

    }

    async init() {
        console.log('ipfs init...');

        await this.login().then( bSuccess => {
            if (bSuccess) {
                console.log('login metamask succeed.');
                const encryptedMessage : string = this.encryptVault(this.encryptionPublicKey,'{"hello": "world"}');
                console.log('encrypted hello world message: ', encryptedMessage);
            } else {
                console.error('login metamask failed.');
            }
        });

    }

    async login() {
        const bSuccess: boolean = false;

        if (this.provider.isMetaMask) {
            const accounts = await this.provider.request({method: 'eth_requestAccounts'});

            if (this.provider.isConnected()) {
                this.account = accounts[0];
                console.log('metamask connected:', this.account);

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
                    return false;
                };

            } else {
                return false;
            }

        } else {
            return false;
        }

    }

    async upload () {
        if (!this.token) {
            return console.error('A token is needed. You can create one on https://web3.storage');
        }

        const files = [
            this.makeFileObject('file.json', '{"hello": "world"}'),
        ];

        console.log(`Uploading ${files.length} files`);
        const cid = await this.storage.put(files);
        console.log('Content added with CID:', cid);
        return cid;
    }

    makeFileObject (objName: string, objString: string) {
        const blob = new Blob([objString], {type : 'application/json'});

        const file = new File([blob], objName);
        return file;
    }

    encryptVault (publicKey: string, dataString: string) {
        const encryptedMessage = bufferToHex(
            Buffer.from(
                JSON.stringify(
                    ethEncrypt({
                        publicKey: publicKey,
                        data: dataString,
                        version: 'x25519-xsalsa20-poly1305'}
                        )
                ),
                'utf8'
            )
        );
        return encryptedMessage;
    }


}

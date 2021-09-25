import { Utils } from '../misc/utils';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { IpfsService as IpfsServiceAbstraction } from '../abstractions/ipfs.service';
import {
    encrypt as ethEncrypt,
    decrypt as ethDecrypt,
} from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

export class IpfsService implements IpfsServiceAbstraction {
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkRjQzZjJmNmVFQmVmZmMzNEEzYTk0NzRGRDk1OEFDMTQ3ZjdiMmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIyMDY3NTc5MTUsIm5hbWUiOiJ0aWFuY2hpIn0.RqVsEe2aYLUkm5kdqW7tiTAdEj_i0uv854BuITXXm7Q';
    private storage: Web3Storage;
    private ethutil: any;
    private provider: any;
    private account : string;
    private encryptionPublicKey: string;
    public logined: boolean;
    public vaultCid: string;

    constructor() {
        console.log('ipfs construct()');
        if (!this.token) {
            console.error('A web3.storage token is needed.');
        }
        this.storage = new Web3Storage({ token: this.token });

        const createMetaMaskProvider = require('metamask-extension-provider');
        this.provider = createMetaMaskProvider();

        this.ethutil = require('ethereumjs-util');

    }

    async init() {
        console.log('ipfs init()');

        this.logined = false;
        await this.login().then( bSuccess => {
            if (bSuccess) {
                this.logined = true;
                console.log('login metamask succeed.');
            } else {
                console.error('login metamask failed.');
            }
        });

    }

    async test() {
        console.log('ipfs test()');

        if (this.logined) {
            const encryptedMessage : string = this.encryptVault(this.encryptionPublicKey,'{"hello": "world"}');
            const cid = await this.uploadVault(encryptedMessage);
            console.log('files status: ', await this.storage.status(cid));

            //const res = await this.storage.get(this.vaultCid);
            const res = await this.storage.get('bafybeid44p3k2ykbkub7oiq3alhfhmnxu2mgkv4qh2dyszps6v4yxewjga');
            if (res.ok) {
                const files = await res.files();
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    if(file.name == "vault") {
                        const message: string = await file.text();
                        const text: string = await this.decryptVault(message);
                        console.log('vault retrived: ', text);
                    }
                }
            } else {
                console.error('cannot get files with cid: ', this.vaultCid);
            }

        }
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

    async uploadVault (message: string) {
        const files = [
            this.makeFileObject('vault', message),
        ];

        const cid = await this.storage.put(files);
        console.log('Content added with CID:', cid);
        this.vaultCid = cid;
        return cid;
    }

    makeFileObject (objName: string, objString: string) {
        const blob = new Blob([objString], {type : 'application/json'});

        const file = new File([blob], objName);
        return file;
    }

    encryptVault (publicKey: string, vault: string) {
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
        const message = await this.provider.request({
            method: 'eth_decrypt',
            params: [encryptedVault, this.account],
        });
        return message;
    }

}

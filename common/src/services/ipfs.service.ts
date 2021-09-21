import { Utils } from '../misc/utils';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { IpfsService as IpfsServiceAbstraction } from '../abstractions/ipfs.service';

export class IpfsService implements IpfsServiceAbstraction {
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNkRjQzZjJmNmVFQmVmZmMzNEEzYTk0NzRGRDk1OEFDMTQ3ZjdiMmUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIyMDY3NTc5MTUsIm5hbWUiOiJ0aWFuY2hpIn0.RqVsEe2aYLUkm5kdqW7tiTAdEj_i0uv854BuITXXm7Q';
    private storage: Web3Storage;

    constructor() {
        this.storage = new Web3Storage({ token: this.token });
    }

    init() {
        console.log('ipfs');
    }

    test () {
        if (!this.token) {
            return console.error('A token is needed. You can create one on https://web3.storage');
        }

        const files = [];

        console.log(`Uploading ${files.length} files`);
        //const cid = await this.storage.put(files);
        //console.log('Content added with CID:', cid);
    }

}

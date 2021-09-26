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
    public account : string;
    private encryptionPublicKey: string;
    public loggedin: boolean;
    public vaultCid: string;
    private newVaultString: string = '{"Object":"sync","Profile":{"Object":"profile","Id":null,"Name":null,"Email":null,"EmailVerified":false,"Premium":false,"MasterPasswordHint":"","Culture":"en-US","TwoFactorEnabled":false,"Key":"","PrivateKey":"","SecurityStamp":"","ForcePasswordReset":false,"Organizations":[],"Providers":[],"ProviderOrganizations":[]},"Folders":[],"Collections":[],"Ciphers":[],"Domains":{"Object":"domains","EquivalentDomains":null,"GlobalEquivalentDomains":[{"Type":2,"Domains":["ameritrade.com","tdameritrade.com"],"Excluded":false},{"Type":3,"Domains":["bankofamerica.com","bofa.com","mbna.com","usecfo.com"],"Excluded":false},{"Type":4,"Domains":["sprint.com","sprintpcs.com","nextel.com"],"Excluded":false},{"Type":0,"Domains":["youtube.com","google.com","gmail.com"],"Excluded":false},{"Type":1,"Domains":["apple.com","icloud.com"],"Excluded":false},{"Type":5,"Domains":["wellsfargo.com","wf.com"],"Excluded":false},{"Type":6,"Domains":["mymerrill.com","ml.com","merrilledge.com"],"Excluded":false},{"Type":7,"Domains":["accountonline.com","citi.com","citibank.com","citicards.com","citibankonline.com"],"Excluded":false},{"Type":8,"Domains":["cnet.com","cnettv.com","com.com","download.com","news.com","search.com","upload.com"],"Excluded":false},{"Type":9,"Domains":["bananarepublic.com","gap.com","oldnavy.com","piperlime.com"],"Excluded":false},{"Type":10,"Domains":["bing.com","hotmail.com","live.com","microsoft.com","msn.com","passport.net","windows.com","microsoftonline.com","office.com","office365.com","microsoftstore.com","xbox.com","azure.com","windowsazure.com"],"Excluded":false},{"Type":11,"Domains":["ua2go.com","ual.com","united.com","unitedwifi.com"],"Excluded":false},{"Type":12,"Domains":["overture.com","yahoo.com"],"Excluded":false},{"Type":13,"Domains":["zonealarm.com","zonelabs.com"],"Excluded":false},{"Type":14,"Domains":["paypal.com","paypal-search.com"],"Excluded":false},{"Type":15,"Domains":["avon.com","youravon.com"],"Excluded":false},{"Type":16,"Domains":["diapers.com","soap.com","wag.com","yoyo.com","beautybar.com","casa.com","afterschool.com","vine.com","bookworm.com","look.com","vinemarket.com"],"Excluded":false},{"Type":17,"Domains":["1800contacts.com","800contacts.com"],"Excluded":false},{"Type":18,"Domains":["amazon.com","amazon.ae","amazon.ca","amazon.co.uk","amazon.com.au","amazon.com.br","amazon.com.mx","amazon.com.tr","amazon.de","amazon.es","amazon.fr","amazon.in","amazon.it","amazon.nl","amazon.pl","amazon.sa","amazon.se","amazon.sg"],"Excluded":false},{"Type":19,"Domains":["cox.com","cox.net","coxbusiness.com"],"Excluded":false},{"Type":20,"Domains":["mynortonaccount.com","norton.com"],"Excluded":false},{"Type":21,"Domains":["verizon.com","verizon.net"],"Excluded":false},{"Type":22,"Domains":["rakuten.com","buy.com"],"Excluded":false},{"Type":23,"Domains":["siriusxm.com","sirius.com"],"Excluded":false},{"Type":24,"Domains":["ea.com","origin.com","play4free.com","tiberiumalliance.com"],"Excluded":false},{"Type":25,"Domains":["37signals.com","basecamp.com","basecamphq.com","highrisehq.com"],"Excluded":false},{"Type":26,"Domains":["steampowered.com","steamcommunity.com","steamgames.com"],"Excluded":false},{"Type":27,"Domains":["chart.io","chartio.com"],"Excluded":false},{"Type":28,"Domains":["gotomeeting.com","citrixonline.com"],"Excluded":false},{"Type":29,"Domains":["gogoair.com","gogoinflight.com"],"Excluded":false},{"Type":30,"Domains":["mysql.com","oracle.com"],"Excluded":false},{"Type":31,"Domains":["discover.com","discovercard.com"],"Excluded":false},{"Type":32,"Domains":["dcu.org","dcu-online.org"],"Excluded":false},{"Type":33,"Domains":["healthcare.gov","cms.gov"],"Excluded":false},{"Type":34,"Domains":["pepco.com","pepcoholdings.com"],"Excluded":false},{"Type":35,"Domains":["century21.com","21online.com"],"Excluded":false},{"Type":36,"Domains":["comcast.com","comcast.net","xfinity.com"],"Excluded":false},{"Type":37,"Domains":["cricketwireless.com","aiowireless.com"],"Excluded":false},{"Type":38,"Domains":["mandtbank.com","mtb.com"],"Excluded":false},{"Type":39,"Domains":["dropbox.com","getdropbox.com"],"Excluded":false},{"Type":40,"Domains":["snapfish.com","snapfish.ca"],"Excluded":false},{"Type":41,"Domains":["alibaba.com","aliexpress.com","aliyun.com","net.cn"],"Excluded":false},{"Type":42,"Domains":["playstation.com","sonyentertainmentnetwork.com"],"Excluded":false},{"Type":43,"Domains":["mercadolivre.com","mercadolivre.com.br","mercadolibre.com","mercadolibre.com.ar","mercadolibre.com.mx"],"Excluded":false},{"Type":44,"Domains":["zendesk.com","zopim.com"],"Excluded":false},{"Type":45,"Domains":["autodesk.com","tinkercad.com"],"Excluded":false},{"Type":46,"Domains":["railnation.ru","railnation.de","rail-nation.com","railnation.gr","railnation.us","trucknation.de","traviangames.com"],"Excluded":false},{"Type":47,"Domains":["wpcu.coop","wpcuonline.com"],"Excluded":false},{"Type":48,"Domains":["mathletics.com","mathletics.com.au","mathletics.co.uk"],"Excluded":false},{"Type":49,"Domains":["discountbank.co.il","telebank.co.il"],"Excluded":false},{"Type":50,"Domains":["mi.com","xiaomi.com"],"Excluded":false},{"Type":52,"Domains":["postepay.it","poste.it"],"Excluded":false},{"Type":51,"Domains":["facebook.com","messenger.com"],"Excluded":false},{"Type":53,"Domains":["skysports.com","skybet.com","skyvegas.com"],"Excluded":false},{"Type":54,"Domains":["disneymoviesanywhere.com","go.com","disney.com","dadt.com","disneyplus.com"],"Excluded":false},{"Type":55,"Domains":["pokemon-gl.com","pokemon.com"],"Excluded":false},{"Type":56,"Domains":["myuv.com","uvvu.com"],"Excluded":false},{"Type":58,"Domains":["mdsol.com","imedidata.com"],"Excluded":false},{"Type":57,"Domains":["bank-yahav.co.il","bankhapoalim.co.il"],"Excluded":false},{"Type":59,"Domains":["sears.com","shld.net"],"Excluded":false},{"Type":60,"Domains":["xiami.com","alipay.com"],"Excluded":false},{"Type":61,"Domains":["belkin.com","seedonk.com"],"Excluded":false},{"Type":62,"Domains":["turbotax.com","intuit.com"],"Excluded":false},{"Type":63,"Domains":["shopify.com","myshopify.com"],"Excluded":false},{"Type":64,"Domains":["ebay.com","ebay.at","ebay.be","ebay.ca","ebay.ch","ebay.cn","ebay.co.jp","ebay.co.th","ebay.co.uk","ebay.com.au","ebay.com.hk","ebay.com.my","ebay.com.sg","ebay.com.tw","ebay.de","ebay.es","ebay.fr","ebay.ie","ebay.in","ebay.it","ebay.nl","ebay.ph","ebay.pl"],"Excluded":false},{"Type":65,"Domains":["techdata.com","techdata.ch"],"Excluded":false},{"Type":66,"Domains":["schwab.com","schwabplan.com"],"Excluded":false},{"Type":68,"Domains":["tesla.com","teslamotors.com"],"Excluded":false},{"Type":69,"Domains":["morganstanley.com","morganstanleyclientserv.com","stockplanconnect.com","ms.com"],"Excluded":false},{"Type":70,"Domains":["taxact.com","taxactonline.com"],"Excluded":false},{"Type":71,"Domains":["mediawiki.org","wikibooks.org","wikidata.org","wikimedia.org","wikinews.org","wikipedia.org","wikiquote.org","wikisource.org","wikiversity.org","wikivoyage.org","wiktionary.org"],"Excluded":false},{"Type":72,"Domains":["airbnb.at","airbnb.be","airbnb.ca","airbnb.ch","airbnb.cl","airbnb.co.cr","airbnb.co.id","airbnb.co.in","airbnb.co.kr","airbnb.co.nz","airbnb.co.uk","airbnb.co.ve","airbnb.com","airbnb.com.ar","airbnb.com.au","airbnb.com.bo","airbnb.com.br","airbnb.com.bz","airbnb.com.co","airbnb.com.ec","airbnb.com.gt","airbnb.com.hk","airbnb.com.hn","airbnb.com.mt","airbnb.com.my","airbnb.com.ni","airbnb.com.pa","airbnb.com.pe","airbnb.com.py","airbnb.com.sg","airbnb.com.sv","airbnb.com.tr","airbnb.com.tw","airbnb.cz","airbnb.de","airbnb.dk","airbnb.es","airbnb.fi","airbnb.fr","airbnb.gr","airbnb.gy","airbnb.hu","airbnb.ie","airbnb.is","airbnb.it","airbnb.jp","airbnb.mx","airbnb.nl","airbnb.no","airbnb.pl","airbnb.pt","airbnb.ru","airbnb.se"],"Excluded":false},{"Type":73,"Domains":["eventbrite.at","eventbrite.be","eventbrite.ca","eventbrite.ch","eventbrite.cl","eventbrite.co","eventbrite.co.nz","eventbrite.co.uk","eventbrite.com","eventbrite.com.ar","eventbrite.com.au","eventbrite.com.br","eventbrite.com.mx","eventbrite.com.pe","eventbrite.de","eventbrite.dk","eventbrite.es","eventbrite.fi","eventbrite.fr","eventbrite.hk","eventbrite.ie","eventbrite.it","eventbrite.nl","eventbrite.pt","eventbrite.se","eventbrite.sg"],"Excluded":false},{"Type":74,"Domains":["stackexchange.com","superuser.com","stackoverflow.com","serverfault.com","mathoverflow.net","askubuntu.com","stackapps.com"],"Excluded":false},{"Type":75,"Domains":["docusign.com","docusign.net"],"Excluded":false},{"Type":76,"Domains":["envato.com","themeforest.net","codecanyon.net","videohive.net","audiojungle.net","graphicriver.net","photodune.net","3docean.net"],"Excluded":false},{"Type":77,"Domains":["x10hosting.com","x10premium.com"],"Excluded":false},{"Type":78,"Domains":["dnsomatic.com","opendns.com","umbrella.com"],"Excluded":false},{"Type":79,"Domains":["cagreatamerica.com","canadaswonderland.com","carowinds.com","cedarfair.com","cedarpoint.com","dorneypark.com","kingsdominion.com","knotts.com","miadventure.com","schlitterbahn.com","valleyfair.com","visitkingsisland.com","worldsoffun.com"],"Excluded":false},{"Type":80,"Domains":["ubnt.com","ui.com"],"Excluded":false},{"Type":81,"Domains":["discordapp.com","discord.com"],"Excluded":false},{"Type":82,"Domains":["netcup.de","netcup.eu","customercontrolpanel.de"],"Excluded":false},{"Type":83,"Domains":["yandex.com","ya.ru","yandex.az","yandex.by","yandex.co.il","yandex.com.am","yandex.com.ge","yandex.com.tr","yandex.ee","yandex.fi","yandex.fr","yandex.kg","yandex.kz","yandex.lt","yandex.lv","yandex.md","yandex.pl","yandex.ru","yandex.tj","yandex.tm","yandex.ua","yandex.uz"],"Excluded":false},{"Type":84,"Domains":["sonyentertainmentnetwork.com","sony.com"],"Excluded":false},{"Type":85,"Domains":["protonmail.com","protonvpn.com"],"Excluded":false}]},"Policies":[],"Sends":[]}';
    private newVault: any;

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

        this.newVault = JSON.parse(this.newVaultString);

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

        while(this.account == null) {
            await this.login();
        }

        if (this.account != null) {
            const cid = await this.saveVault(this.newVaultString);
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

        const cid = await this.storage.put(files, {name: this.account});
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

    async getSync() {
        return JSON.parse(this.newVaultString);
    }

}

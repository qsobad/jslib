import { Utils } from '../misc/utils';
import { BrowserApi } from '../../../../src/browser/browserApi';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { IpfsService as IpfsServiceAbstraction } from '../abstractions/ipfs.service';
import { StorageService } from '../abstractions/storage.service';
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
    private vault: any;
    private newVaultTestString: string = '{"Object":"sync","Profile":{"Object":"profile","Id":"de705729-f29f-4e73-a41e-adac00ee9bcf","Name":null,"Email":"2037263093@qq.com","EmailVerified":false,"Premium":false,"MasterPasswordHint":"1..8","Culture":"en-US","TwoFactorEnabled":false,"Key":"2.ptaLYS9ivDmM8spisXV1ng==|HkPv+m1OJvM6/YjPcv0RRf5BlA2j/qwJPDOReL+SsMtuMPDdR8vGFdeUtks061lA+yLIUW6W3qTHt1JEbeORI8cLqOm3rxr1l31blhZagYQ=|4w1uj1YR+aaWrfiNgLoKn0BLpztvgGnB6npYsfWJnnI=","PrivateKey":"2.zy5THbFy3m5iFFYmc6KpZQ==|Y079j/K9TxMo1S+61yzsHTVro9IAaw7Oqd7lwqM1cQyfYD87GeVHk4qloYny3wDuvcOjf+KQrHjxGzY8W1pMhPNPJK8xVN0DBiZDTZKnvz+nY9RcgeN/E9O/zMlI2kZYh/vD2GNRACqle6BeUtlXmV6KNHceiD9y1jGFUixx+DO5tr1n97l1sZBoAqSDYtBAUeoO1wK1ju1vJo5CiitR9oe8Yhh2PUblIN/81bCdkfgHdWZVY0AkgZUQya2dhyHBswikFsj/urxzKd8fA1z6AGfghRKaw6GlS+Czh3c1KGOuFpAGHbIZ+rMfoRT2XYL++7J8m+wH+9wKwsopOyMdrsMm2L8CHq7LeieKVBU4e0R+Vmmf2u6x0zFKLLg92tldhoRaR7vBRM1lTbBTZmp3yi/Ul+Qm+4sSYrTn7m+Bl5rBi9d0g3V2oNKmMM5XeduM3eUJ+REDa5UgnwMl0M4tyAZKxinRkCSUR/H9srpcSzi6iSIoSuHtxR3qddwQKDEP95W+E6PwnmF+yVqBcaDoC7brNqNT1PmBQfaN79BxIpFl5aq9WIr23IBl/7TzR4n31ASrVT/ZK4+yGdLBaBkW2PQU7e/JssI/kmOwImOY8bwYb/q+f3kulGfXlWfO45JVt3MXIUUBTQz58NGkfv3vIuGmjl+sUcTenS05G/pB4GWVZDPSlNPvNmINf7/hLY5voieSN5TicVYDKrNjBK8hb6549AZQlFHm6BFKQP52rKtubYuCeMHuyiYz5QZJODDmQuuTppVDv0YOS/rZYutbm3B8ZSUxFlKOAtL0+oHW5iglr/92LaF1ST8+4JCSqb+Vpu8wiZXpUwuXkLcyAfqsGSo1C/1ereTeT3sDYcjnTRVXWcSapJTL7feHm282D8Ecqf2j2myapOHeccHTF3TpvAcNUFn/xMEnlmOS22Cz5UVPVkkCAhgrd8Lw6c5p3hfowfiCAELWOvmLxA+YavlPJBU3+TOSC9oeA2Kc50BUa7Zg3PWNLo1YoYuBDCIBQxoffD9VOZrHIuOw5Pi8mN0QwDj0i3X1nlCxPkNHiBg9q3xq/HE/RrtCrBFOY6PcGjmT+soVrJAWrUv+7MlCZBUQyy57jUkdrj+o4iHQgJGZr3yE47PHm7mLzuYm0dnpsXi4bQL5HPlCpnw9JQ8pg9VoL5APuf1gH0O+e9FjAypdhv/9BJqeLyStJaTgxGpFYHZLFQiAuHZhFMpwfUtiHFsra7NiZE7KcsI/qypw7PlH0fRyFe4xUdBp5XLke//mTdmWwYd9xROWr48SH7ED5aYc5yimK8xBPITvd5GQ+VliFaastKWUGNOholULbGy21jPd4dozTqXENYxH63xkWXrA83HzT+Aiq5dCo8Bfo3Pc3RTFi/WQHvHIXD4u1LHpotepw5ux0qz0sOy7iPHwoHpDbBbmeaQOIv9eO0+A31T9ao75AG1DoJUNvl8Z6oIG+gy4iS9b0yLIuU0bgS/YJQZFLfoY2fpBns1t/Pc/42BcNm+fH10u+xeAiIe70gYyYp6uFg8qRzWBpV3YccobLgKsixfmIQRbzHo6bzu6UOx0v9CWsyHyG27p00n5A4V37HQiJ3NKl0edgaQsKI5nEbPJrwJDMkTvB02+BQXcI9L6cRg=|tbkkJBM32729+fpznReXNvJDLop+07kJo+OM2eSTz/k=","SecurityStamp":"3IDOWMLMNK6L6BXE7ADUYMWFTFL7XJW2","ForcePasswordReset":false,"Organizations":[],"Providers":[],"ProviderOrganizations":[]},"Folders":[{"Object":"folder","Id":"8e955408-a3d6-4031-8399-adaf004eb350","Name":"2.AYDTGoj6bCftX6WhyYgX4A==|ZDaOh/NHq5gST3YkthvFmw==|F1YGUyVrWy1NRiTnY9Xybbl1QF6oX/KnYv+U5ax4Bu0=","RevisionDate":"2021-09-26T04:46:32.3733333Z"}],"Collections":[],"Ciphers":[{"Object":"cipherDetails","CollectionIds":[],"FolderId":null,"Favorite":false,"Edit":true,"ViewPassword":true,"Id":"cb17b3e8-e7bd-499c-a6c1-adaf004e98bf","OrganizationId":null,"Type":1,"Data":{"Uri":"2.JzzRYYlxLG2FMrWTBDLMjA==|qdCsnJc29i5pqhflJImLW2oMxPgwqxhz3EGeT8pyiwc+PhpflNfw5OnjPzq/mdhHcogMDi/ECJJSd4QazP8F56i7VO4f+9QpER5te1LP0MCld7iWH/IA2bJrYS7S+t17vJ0u4nHqyw+aLTMI9eGOVhUW9mFDFO5gh7eo3pBqC7UJIKX/1h3kBHOT4tLYmtQeIdEFBvQWKxvp6EZ20qns+dBMTHlTFblWISMUkmjTwCvYyFwfK+tAcrbgnfWQdRSIEkU60QqvaZ2qS00DRq3K19HIt2UJIVvAMHXjwBgU1Xk=|I389Ued1Th8lvzbNdFdAd36TMrWS5vUXn0e6S/M9gh0=","Uris":[{"Uri":"2.JzzRYYlxLG2FMrWTBDLMjA==|qdCsnJc29i5pqhflJImLW2oMxPgwqxhz3EGeT8pyiwc+PhpflNfw5OnjPzq/mdhHcogMDi/ECJJSd4QazP8F56i7VO4f+9QpER5te1LP0MCld7iWH/IA2bJrYS7S+t17vJ0u4nHqyw+aLTMI9eGOVhUW9mFDFO5gh7eo3pBqC7UJIKX/1h3kBHOT4tLYmtQeIdEFBvQWKxvp6EZ20qns+dBMTHlTFblWISMUkmjTwCvYyFwfK+tAcrbgnfWQdRSIEkU60QqvaZ2qS00DRq3K19HIt2UJIVvAMHXjwBgU1Xk=|I389Ued1Th8lvzbNdFdAd36TMrWS5vUXn0e6S/M9gh0=","Match":null}],"Username":"2.93VW2yn6rdjHN3Qy4hSFyw==|D+MPL4x4OsVDviAb6UF2dA==|PMZCUzB8iS+T6+/JcXPLXvWbev/UMdFWRylml7LeNM8=","Password":"2.BYngDx+DW+4pBaFZcFbFpg==|pSPv8jY9Gtze6bxP6Wj1JQ==|mUPelXdDDmI2Gu69r4psIwjAipgxfUlDSMGr2yzLQtc=","PasswordRevisionDate":null,"Totp":null,"AutofillOnPageLoad":null,"Name":"2.5GN1ojXgzlU2uhtYzvXaAw==|ulSMHqSMoVVmeqTvuM4qWMAIxN+leKTSWw+uD/zJp2dqdM1c9qG+IMVu1wqWdfRA|XofGewxYPjfCtsQCVYoSvsU/YwSNJn6kA4nK3JnSzr8=","Notes":null,"Fields":null,"PasswordHistory":null},"Name":"2.5GN1ojXgzlU2uhtYzvXaAw==|ulSMHqSMoVVmeqTvuM4qWMAIxN+leKTSWw+uD/zJp2dqdM1c9qG+IMVu1wqWdfRA|XofGewxYPjfCtsQCVYoSvsU/YwSNJn6kA4nK3JnSzr8=","Notes":null,"Login":{"Uri":"2.JzzRYYlxLG2FMrWTBDLMjA==|qdCsnJc29i5pqhflJImLW2oMxPgwqxhz3EGeT8pyiwc+PhpflNfw5OnjPzq/mdhHcogMDi/ECJJSd4QazP8F56i7VO4f+9QpER5te1LP0MCld7iWH/IA2bJrYS7S+t17vJ0u4nHqyw+aLTMI9eGOVhUW9mFDFO5gh7eo3pBqC7UJIKX/1h3kBHOT4tLYmtQeIdEFBvQWKxvp6EZ20qns+dBMTHlTFblWISMUkmjTwCvYyFwfK+tAcrbgnfWQdRSIEkU60QqvaZ2qS00DRq3K19HIt2UJIVvAMHXjwBgU1Xk=|I389Ued1Th8lvzbNdFdAd36TMrWS5vUXn0e6S/M9gh0=","Uris":[{"Uri":"2.JzzRYYlxLG2FMrWTBDLMjA==|qdCsnJc29i5pqhflJImLW2oMxPgwqxhz3EGeT8pyiwc+PhpflNfw5OnjPzq/mdhHcogMDi/ECJJSd4QazP8F56i7VO4f+9QpER5te1LP0MCld7iWH/IA2bJrYS7S+t17vJ0u4nHqyw+aLTMI9eGOVhUW9mFDFO5gh7eo3pBqC7UJIKX/1h3kBHOT4tLYmtQeIdEFBvQWKxvp6EZ20qns+dBMTHlTFblWISMUkmjTwCvYyFwfK+tAcrbgnfWQdRSIEkU60QqvaZ2qS00DRq3K19HIt2UJIVvAMHXjwBgU1Xk=|I389Ued1Th8lvzbNdFdAd36TMrWS5vUXn0e6S/M9gh0=","Match":null}],"Username":"2.93VW2yn6rdjHN3Qy4hSFyw==|D+MPL4x4OsVDviAb6UF2dA==|PMZCUzB8iS+T6+/JcXPLXvWbev/UMdFWRylml7LeNM8=","Password":"2.BYngDx+DW+4pBaFZcFbFpg==|pSPv8jY9Gtze6bxP6Wj1JQ==|mUPelXdDDmI2Gu69r4psIwjAipgxfUlDSMGr2yzLQtc=","PasswordRevisionDate":null,"Totp":null,"AutofillOnPageLoad":null},"Card":null,"Identity":null,"SecureNote":null,"Fields":null,"PasswordHistory":null,"Attachments":null,"OrganizationUseTotp":false,"RevisionDate":"2021-09-26T04:46:09.7Z","DeletedDate":null,"Reprompt":0},{"Object":"cipherDetails","CollectionIds":[],"FolderId":"8e955408-a3d6-4031-8399-adaf004eb350","Favorite":false,"Edit":true,"ViewPassword":true,"Id":"0e7bed91-e9d3-4a5f-ba7c-adaf004ef6c3","OrganizationId":null,"Type":1,"Data":{"Uri":"2.UNCikT67kJ3/ZJfinw3pfg==|GS56sCeers7QG2p+WWLZsmbWHoO+wZlMXKQULSadgHaPJEZKjgGx+AveUqTQofp1X388qKzqOobVv3FV+rNDMyJHItelFsKqn38lxuHy1YoRBOTi/YtCelEp8FqfVII8aTja3x0ABt+SfPsW6+Wtqv4kGXrciL6nZSOt8Gg4jTCT3lXLdxQLV0z9kHvvRCV4HtzrbbfSSvAsRdaNTxrNmnLFa9qALX7Gn2dYSjSlw26MO1QrXrOMgsZcfOUgxUXH8AfMki+Rt4inKU1GI8q4aDIFgysZTWYrhvmKxVWnL/s=|9YNItsFqLfjrQuUaeYhDuxizy1xH2/1V8RToKDT9dZ8=","Uris":[{"Uri":"2.UNCikT67kJ3/ZJfinw3pfg==|GS56sCeers7QG2p+WWLZsmbWHoO+wZlMXKQULSadgHaPJEZKjgGx+AveUqTQofp1X388qKzqOobVv3FV+rNDMyJHItelFsKqn38lxuHy1YoRBOTi/YtCelEp8FqfVII8aTja3x0ABt+SfPsW6+Wtqv4kGXrciL6nZSOt8Gg4jTCT3lXLdxQLV0z9kHvvRCV4HtzrbbfSSvAsRdaNTxrNmnLFa9qALX7Gn2dYSjSlw26MO1QrXrOMgsZcfOUgxUXH8AfMki+Rt4inKU1GI8q4aDIFgysZTWYrhvmKxVWnL/s=|9YNItsFqLfjrQuUaeYhDuxizy1xH2/1V8RToKDT9dZ8=","Match":null}],"Username":"2.7NJRRGVsu0au1daxVpMwMA==|2nQUcA0qFwCa3kzYMZzhIg==|w2OwThqPsA4AMtoQNTqH/qXFaX1uVfGX8tdAvKkA96s=","Password":"2./rinJW256X0Jv2I1s3nc+Q==|Eq9sjNb9LrktOWyIEbNrZA==|On9sQNDGrPyGdgzCLMEvPRFK6Ys1GSSDMTKCXxxusSU=","PasswordRevisionDate":null,"Totp":null,"AutofillOnPageLoad":null,"Name":"2.EHw8uImoyGuQLrSmJYUiMA==|uRCfdkulQLaOb4u6ZVhpYqQXBJs9fyMn58aORXnwO9lWDfxBnVOI/dhE2bup3Myr|nuKYXSDSmB69hRD+2tnIjWvyBdpiyMw8xSlUgPIebBo=","Notes":null,"Fields":null,"PasswordHistory":null},"Name":"2.EHw8uImoyGuQLrSmJYUiMA==|uRCfdkulQLaOb4u6ZVhpYqQXBJs9fyMn58aORXnwO9lWDfxBnVOI/dhE2bup3Myr|nuKYXSDSmB69hRD+2tnIjWvyBdpiyMw8xSlUgPIebBo=","Notes":null,"Login":{"Uri":"2.UNCikT67kJ3/ZJfinw3pfg==|GS56sCeers7QG2p+WWLZsmbWHoO+wZlMXKQULSadgHaPJEZKjgGx+AveUqTQofp1X388qKzqOobVv3FV+rNDMyJHItelFsKqn38lxuHy1YoRBOTi/YtCelEp8FqfVII8aTja3x0ABt+SfPsW6+Wtqv4kGXrciL6nZSOt8Gg4jTCT3lXLdxQLV0z9kHvvRCV4HtzrbbfSSvAsRdaNTxrNmnLFa9qALX7Gn2dYSjSlw26MO1QrXrOMgsZcfOUgxUXH8AfMki+Rt4inKU1GI8q4aDIFgysZTWYrhvmKxVWnL/s=|9YNItsFqLfjrQuUaeYhDuxizy1xH2/1V8RToKDT9dZ8=","Uris":[{"Uri":"2.UNCikT67kJ3/ZJfinw3pfg==|GS56sCeers7QG2p+WWLZsmbWHoO+wZlMXKQULSadgHaPJEZKjgGx+AveUqTQofp1X388qKzqOobVv3FV+rNDMyJHItelFsKqn38lxuHy1YoRBOTi/YtCelEp8FqfVII8aTja3x0ABt+SfPsW6+Wtqv4kGXrciL6nZSOt8Gg4jTCT3lXLdxQLV0z9kHvvRCV4HtzrbbfSSvAsRdaNTxrNmnLFa9qALX7Gn2dYSjSlw26MO1QrXrOMgsZcfOUgxUXH8AfMki+Rt4inKU1GI8q4aDIFgysZTWYrhvmKxVWnL/s=|9YNItsFqLfjrQuUaeYhDuxizy1xH2/1V8RToKDT9dZ8=","Match":null}],"Username":"2.7NJRRGVsu0au1daxVpMwMA==|2nQUcA0qFwCa3kzYMZzhIg==|w2OwThqPsA4AMtoQNTqH/qXFaX1uVfGX8tdAvKkA96s=","Password":"2./rinJW256X0Jv2I1s3nc+Q==|Eq9sjNb9LrktOWyIEbNrZA==|On9sQNDGrPyGdgzCLMEvPRFK6Ys1GSSDMTKCXxxusSU=","PasswordRevisionDate":null,"Totp":null,"AutofillOnPageLoad":null},"Card":null,"Identity":null,"SecureNote":null,"Fields":null,"PasswordHistory":null,"Attachments":null,"OrganizationUseTotp":false,"RevisionDate":"2021-09-26T04:47:29.9266667Z","DeletedDate":null,"Reprompt":0}],"Domains":{"Object":"domains","EquivalentDomains":null,"GlobalEquivalentDomains":[{"Type":2,"Domains":["ameritrade.com","tdameritrade.com"],"Excluded":false},{"Type":3,"Domains":["bankofamerica.com","bofa.com","mbna.com","usecfo.com"],"Excluded":false},{"Type":4,"Domains":["sprint.com","sprintpcs.com","nextel.com"],"Excluded":false},{"Type":0,"Domains":["youtube.com","google.com","gmail.com"],"Excluded":false},{"Type":1,"Domains":["apple.com","icloud.com"],"Excluded":false},{"Type":5,"Domains":["wellsfargo.com","wf.com"],"Excluded":false},{"Type":6,"Domains":["mymerrill.com","ml.com","merrilledge.com"],"Excluded":false},{"Type":7,"Domains":["accountonline.com","citi.com","citibank.com","citicards.com","citibankonline.com"],"Excluded":false},{"Type":8,"Domains":["cnet.com","cnettv.com","com.com","download.com","news.com","search.com","upload.com"],"Excluded":false},{"Type":9,"Domains":["bananarepublic.com","gap.com","oldnavy.com","piperlime.com"],"Excluded":false},{"Type":10,"Domains":["bing.com","hotmail.com","live.com","microsoft.com","msn.com","passport.net","windows.com","microsoftonline.com","office.com","office365.com","microsoftstore.com","xbox.com","azure.com","windowsazure.com"],"Excluded":false},{"Type":11,"Domains":["ua2go.com","ual.com","united.com","unitedwifi.com"],"Excluded":false},{"Type":12,"Domains":["overture.com","yahoo.com"],"Excluded":false},{"Type":13,"Domains":["zonealarm.com","zonelabs.com"],"Excluded":false},{"Type":14,"Domains":["paypal.com","paypal-search.com"],"Excluded":false},{"Type":15,"Domains":["avon.com","youravon.com"],"Excluded":false},{"Type":16,"Domains":["diapers.com","soap.com","wag.com","yoyo.com","beautybar.com","casa.com","afterschool.com","vine.com","bookworm.com","look.com","vinemarket.com"],"Excluded":false},{"Type":17,"Domains":["1800contacts.com","800contacts.com"],"Excluded":false},{"Type":18,"Domains":["amazon.com","amazon.ae","amazon.ca","amazon.co.uk","amazon.com.au","amazon.com.br","amazon.com.mx","amazon.com.tr","amazon.de","amazon.es","amazon.fr","amazon.in","amazon.it","amazon.nl","amazon.pl","amazon.sa","amazon.se","amazon.sg"],"Excluded":false},{"Type":19,"Domains":["cox.com","cox.net","coxbusiness.com"],"Excluded":false},{"Type":20,"Domains":["mynortonaccount.com","norton.com"],"Excluded":false},{"Type":21,"Domains":["verizon.com","verizon.net"],"Excluded":false},{"Type":22,"Domains":["rakuten.com","buy.com"],"Excluded":false},{"Type":23,"Domains":["siriusxm.com","sirius.com"],"Excluded":false},{"Type":24,"Domains":["ea.com","origin.com","play4free.com","tiberiumalliance.com"],"Excluded":false},{"Type":25,"Domains":["37signals.com","basecamp.com","basecamphq.com","highrisehq.com"],"Excluded":false},{"Type":26,"Domains":["steampowered.com","steamcommunity.com","steamgames.com"],"Excluded":false},{"Type":27,"Domains":["chart.io","chartio.com"],"Excluded":false},{"Type":28,"Domains":["gotomeeting.com","citrixonline.com"],"Excluded":false},{"Type":29,"Domains":["gogoair.com","gogoinflight.com"],"Excluded":false},{"Type":30,"Domains":["mysql.com","oracle.com"],"Excluded":false},{"Type":31,"Domains":["discover.com","discovercard.com"],"Excluded":false},{"Type":32,"Domains":["dcu.org","dcu-online.org"],"Excluded":false},{"Type":33,"Domains":["healthcare.gov","cms.gov"],"Excluded":false},{"Type":34,"Domains":["pepco.com","pepcoholdings.com"],"Excluded":false},{"Type":35,"Domains":["century21.com","21online.com"],"Excluded":false},{"Type":36,"Domains":["comcast.com","comcast.net","xfinity.com"],"Excluded":false},{"Type":37,"Domains":["cricketwireless.com","aiowireless.com"],"Excluded":false},{"Type":38,"Domains":["mandtbank.com","mtb.com"],"Excluded":false},{"Type":39,"Domains":["dropbox.com","getdropbox.com"],"Excluded":false},{"Type":40,"Domains":["snapfish.com","snapfish.ca"],"Excluded":false},{"Type":41,"Domains":["alibaba.com","aliexpress.com","aliyun.com","net.cn"],"Excluded":false},{"Type":42,"Domains":["playstation.com","sonyentertainmentnetwork.com"],"Excluded":false},{"Type":43,"Domains":["mercadolivre.com","mercadolivre.com.br","mercadolibre.com","mercadolibre.com.ar","mercadolibre.com.mx"],"Excluded":false},{"Type":44,"Domains":["zendesk.com","zopim.com"],"Excluded":false},{"Type":45,"Domains":["autodesk.com","tinkercad.com"],"Excluded":false},{"Type":46,"Domains":["railnation.ru","railnation.de","rail-nation.com","railnation.gr","railnation.us","trucknation.de","traviangames.com"],"Excluded":false},{"Type":47,"Domains":["wpcu.coop","wpcuonline.com"],"Excluded":false},{"Type":48,"Domains":["mathletics.com","mathletics.com.au","mathletics.co.uk"],"Excluded":false},{"Type":49,"Domains":["discountbank.co.il","telebank.co.il"],"Excluded":false},{"Type":50,"Domains":["mi.com","xiaomi.com"],"Excluded":false},{"Type":52,"Domains":["postepay.it","poste.it"],"Excluded":false},{"Type":51,"Domains":["facebook.com","messenger.com"],"Excluded":false},{"Type":53,"Domains":["skysports.com","skybet.com","skyvegas.com"],"Excluded":false},{"Type":54,"Domains":["disneymoviesanywhere.com","go.com","disney.com","dadt.com","disneyplus.com"],"Excluded":false},{"Type":55,"Domains":["pokemon-gl.com","pokemon.com"],"Excluded":false},{"Type":56,"Domains":["myuv.com","uvvu.com"],"Excluded":false},{"Type":58,"Domains":["mdsol.com","imedidata.com"],"Excluded":false},{"Type":57,"Domains":["bank-yahav.co.il","bankhapoalim.co.il"],"Excluded":false},{"Type":59,"Domains":["sears.com","shld.net"],"Excluded":false},{"Type":60,"Domains":["xiami.com","alipay.com"],"Excluded":false},{"Type":61,"Domains":["belkin.com","seedonk.com"],"Excluded":false},{"Type":62,"Domains":["turbotax.com","intuit.com"],"Excluded":false},{"Type":63,"Domains":["shopify.com","myshopify.com"],"Excluded":false},{"Type":64,"Domains":["ebay.com","ebay.at","ebay.be","ebay.ca","ebay.ch","ebay.cn","ebay.co.jp","ebay.co.th","ebay.co.uk","ebay.com.au","ebay.com.hk","ebay.com.my","ebay.com.sg","ebay.com.tw","ebay.de","ebay.es","ebay.fr","ebay.ie","ebay.in","ebay.it","ebay.nl","ebay.ph","ebay.pl"],"Excluded":false},{"Type":65,"Domains":["techdata.com","techdata.ch"],"Excluded":false},{"Type":66,"Domains":["schwab.com","schwabplan.com"],"Excluded":false},{"Type":68,"Domains":["tesla.com","teslamotors.com"],"Excluded":false},{"Type":69,"Domains":["morganstanley.com","morganstanleyclientserv.com","stockplanconnect.com","ms.com"],"Excluded":false},{"Type":70,"Domains":["taxact.com","taxactonline.com"],"Excluded":false},{"Type":71,"Domains":["mediawiki.org","wikibooks.org","wikidata.org","wikimedia.org","wikinews.org","wikipedia.org","wikiquote.org","wikisource.org","wikiversity.org","wikivoyage.org","wiktionary.org"],"Excluded":false},{"Type":72,"Domains":["airbnb.at","airbnb.be","airbnb.ca","airbnb.ch","airbnb.cl","airbnb.co.cr","airbnb.co.id","airbnb.co.in","airbnb.co.kr","airbnb.co.nz","airbnb.co.uk","airbnb.co.ve","airbnb.com","airbnb.com.ar","airbnb.com.au","airbnb.com.bo","airbnb.com.br","airbnb.com.bz","airbnb.com.co","airbnb.com.ec","airbnb.com.gt","airbnb.com.hk","airbnb.com.hn","airbnb.com.mt","airbnb.com.my","airbnb.com.ni","airbnb.com.pa","airbnb.com.pe","airbnb.com.py","airbnb.com.sg","airbnb.com.sv","airbnb.com.tr","airbnb.com.tw","airbnb.cz","airbnb.de","airbnb.dk","airbnb.es","airbnb.fi","airbnb.fr","airbnb.gr","airbnb.gy","airbnb.hu","airbnb.ie","airbnb.is","airbnb.it","airbnb.jp","airbnb.mx","airbnb.nl","airbnb.no","airbnb.pl","airbnb.pt","airbnb.ru","airbnb.se"],"Excluded":false},{"Type":73,"Domains":["eventbrite.at","eventbrite.be","eventbrite.ca","eventbrite.ch","eventbrite.cl","eventbrite.co","eventbrite.co.nz","eventbrite.co.uk","eventbrite.com","eventbrite.com.ar","eventbrite.com.au","eventbrite.com.br","eventbrite.com.mx","eventbrite.com.pe","eventbrite.de","eventbrite.dk","eventbrite.es","eventbrite.fi","eventbrite.fr","eventbrite.hk","eventbrite.ie","eventbrite.it","eventbrite.nl","eventbrite.pt","eventbrite.se","eventbrite.sg"],"Excluded":false},{"Type":74,"Domains":["stackexchange.com","superuser.com","stackoverflow.com","serverfault.com","mathoverflow.net","askubuntu.com","stackapps.com"],"Excluded":false},{"Type":75,"Domains":["docusign.com","docusign.net"],"Excluded":false},{"Type":76,"Domains":["envato.com","themeforest.net","codecanyon.net","videohive.net","audiojungle.net","graphicriver.net","photodune.net","3docean.net"],"Excluded":false},{"Type":77,"Domains":["x10hosting.com","x10premium.com"],"Excluded":false},{"Type":78,"Domains":["dnsomatic.com","opendns.com","umbrella.com"],"Excluded":false},{"Type":79,"Domains":["cagreatamerica.com","canadaswonderland.com","carowinds.com","cedarfair.com","cedarpoint.com","dorneypark.com","kingsdominion.com","knotts.com","miadventure.com","schlitterbahn.com","valleyfair.com","visitkingsisland.com","worldsoffun.com"],"Excluded":false},{"Type":80,"Domains":["ubnt.com","ui.com"],"Excluded":false},{"Type":81,"Domains":["discordapp.com","discord.com"],"Excluded":false},{"Type":82,"Domains":["netcup.de","netcup.eu","customercontrolpanel.de"],"Excluded":false},{"Type":83,"Domains":["yandex.com","ya.ru","yandex.az","yandex.by","yandex.co.il","yandex.com.am","yandex.com.ge","yandex.com.tr","yandex.ee","yandex.fi","yandex.fr","yandex.kg","yandex.kz","yandex.lt","yandex.lv","yandex.md","yandex.pl","yandex.ru","yandex.tj","yandex.tm","yandex.ua","yandex.uz"],"Excluded":false},{"Type":84,"Domains":["sonyentertainmentnetwork.com","sony.com"],"Excluded":false},{"Type":85,"Domains":["protonmail.com","protonvpn.com"],"Excluded":false}]},"Policies":[],"Sends":[]}';


    constructor (private storageService: StorageService) {
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

    /* Utils */

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async test() {
        console.log('ipfs test()');

        while(this.account == null) {
            await this.login();
        }

        if (this.account != null) {
            const cid = await this.saveVault();
            console.log('files status: ', await this.storage.status(cid));

            //const vault = await this.getVault(this.vaultCid);
            const vault = await this.getVault();
            console.log('vault retrived: ', vault);
        }
    }

    /* Methods */

    async login() {
        // for testing
        // this.account = 'test';
        // this.encryptionPublicKey = 'test';
        // this.loggedin = true;
        // return true;

        const bSuccess: boolean = false;

        if (this.provider.isMetaMask) {
            if (this.account != null && this.encryptionPublicKey != null && this.provider.isConnected()) {
                return true;
            }

            const accounts = await this.provider.request({method: 'eth_requestAccounts'});

            if (this.provider.isConnected()) {
                this.account = accounts[0];

                this.encryptionPublicKey = await this.getPublicKey();
                console.log(this.encryptionPublicKey);
                if (this.encryptionPublicKey != null) {
                    console.log('metamask loggedin:', this.account);
                    this.loggedin = true;
                    return true;
                }
            }

        }

        this.account = null;
        this.encryptionPublicKey = null;
        this.vault = null;
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
        try {
            const encryptionPublicKey = await this.provider.request({
                method: 'eth_getEncryptionPublicKey',
                params: [this.account], // you must have access to the specified account
            });

            console.log("encryption pubilc key:", this.encryptionPublicKey);
            return encryptionPublicKey;

        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log("We can't encrypt anything without the key.");
            } else {
                console.error(error);
            }
        }
        return;
    }

    async getVaultCid() {
        if(!this.account) {
            console.error('getVaultCid: has not logged in.');
            return;
        }
        // get cid from server
        // return 'bafybeid44p3k2ykbkub7oiq3alhfhmnxu2mgkv4qh2dyszps6v4yxewjga';
        const vaultcid = this.storageService.get('vaultcid.' + this.account);
        console.log('getting vaultcid from browser: ', this.vaultCid);
        if (vaultcid) {
            return vaultcid;
        }
        return;
    }

    async saveVaultCid() {
        if (!this.account) {
            console.error('saveVaultCid: has not logged in.');
            return;
        }
        // saving cid to server
        console.log('saving vaultcid to browser: ', this.vaultCid);
        return this.storageService.save('vaultcid.' + this.account, this.vaultCid);
    }

    async clearVaultCid() {
        const accounts = await this.provider.request({method: 'eth_requestAccounts'});
        const res = this.storageService.remove('vaultcid.' + accounts[0]);
        console.log('vault cid is cleared!!! ', accounts[0]);
        return res;
    }

    async saveVault () {
        if (!this.encryptionPublicKey || !this.vault) {
            console.error('saveVault: missing encryption key or vault');
        }

        const vault = JSON.stringify(this.vault);
        console.log('saving vault: ', vault);
        const message : string = await this.encryptString(this.encryptionPublicKey, vault);

        const files = [
            this.makeFileObject('vault', message),
        ];

        const cid = await this.storage.put(files, {name: this.account});
        console.log('Vault added with CID:', cid);
        this.vaultCid = cid;
        await this.saveVaultCid();
        return cid;
    }

    async getVault () {
        let res: any;
        const cid = await this.getVaultCid();
        if (cid) {
            console.log('get vault from cid: ', cid);
            const res = await this.storage.get(cid);
            if (res.ok) {
                const files = await res.files();
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    if (file.name === 'vault') {
                        const message: string = await file.text();
                        const vaultString: string = await this.decryptString(message);
                        const vault: object = JSON.parse(vaultString);
                        console.log(vault);
                        return vault;
                    }
                }
            } else {
                console.error('cannot get files with res: ', res);
                alert('IPFS file not ready, please wait and try again.');
                return;
            }
        } else {
            const vault: object = JSON.parse(this.newVaultString);
            if (this.account) {
                this.vault.Profile.username = this.account;
            }
            if (this.encryptionPublicKey) {
                this.vault.Profile.key = this.encryptionPublicKey;
            }
            return vault;
        }
    }

    makeFileObject (objName: string, objString: string) {
        const blob = new Blob([objString], {type : 'application/json'});

        const file = new File([blob], objName);
        return file;
    }

    async encryptString (publicKey: string, plainString: string) {
        if (this.encryptionPublicKey == null) {
            this.encryptionPublicKey = await this.getPublicKey();
        }
        const encryptedMessage = bufferToHex(
            Buffer.from(
                JSON.stringify(
                    ethEncrypt({
                        publicKey: publicKey,
                        data: plainString,
                        version: 'x25519-xsalsa20-poly1305'}
                        )
                ),
                'utf8'
            )
        );
        return encryptedMessage;
    }

    async decryptString (encryptedString: string) {
        if (this.account == null) {
            await this.login();
        }

        const message: string = await this.provider.request({
            method: 'eth_decrypt',
            params: [encryptedString, this.account],
        });
        return message;
    }

    /* APIs */

    async getSync() {
        console.log('ipfs.getSync');
        this.vault = await this.getVault();
        return this.vault;
    }

    async postCipher(r: any) {
        console.log('ipfs.postCipher: ', r);
        const rp = r;
        rp.id = this.uuidv4();

        this.vault.Ciphers.push(rp);
        await this.saveVault();
        return rp;
    }

    async postCipherCreate(r: any) {
        console.log('ipfs.postCipherCreate: ', r);
        const rp = r;
        rp.id = this.uuidv4();

        this.vault.Ciphers.push(rp);
        await this.saveVault();
        return rp;
    }

    async putCipher(id: string, r: any) {
        console.log('ipfs.putCipher: ', r);
        const rp = r;
        rp.id = id;

        let ciphers = this.vault.Ciphers;
        for (let i = 0; i < ciphers.length; i++) {
            if(id === ciphers[i].id) {
                ciphers.pop(i);
            }
        }

        this.vault.Ciphers.push(rp);
        await this.saveVault();
        return rp;
    }


    async postFolder(r: any) {
        console.log('ipfs.postFolder: ', r);
        const rp = r;
        rp.id = this.uuidv4();

        this.vault.Folders.push(rp);
        await this.saveVault();
        return rp;
    }

    async putFolder(id: string, r: any) {
        console.log('ipfs.putFolder: ', r);
        const rp = r;
        rp.id = id;

        let folders = this.vault.Folders;
        for (let i = 0; i < folders.length; i++) {
            if(id === folders[i].id) {
                folders.pop(i);
            }
        }

        this.vault.Folders.push(rp);
        await this.saveVault();
        return rp;
    }

}

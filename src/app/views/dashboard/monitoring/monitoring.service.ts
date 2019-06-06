import { Injectable } from '@angular/core';

export class AssetStatus {
    site: string;
    online: number;
    offline: number;
    invChannel: number;
    invUsrPwd: number;
    unregMtr: number;
}

const assetsStatus: AssetStatus[] = [{
    site: 'BUKIT TINGGI',
    online: 500,
    offline: 100,
    invChannel: 50,
    invUsrPwd: 30,
    unregMtr: 20,
}, {
    site: 'PADANG PANJANG',
    online: 250,
    offline: 50,
    invChannel: 0,
    invUsrPwd: 0,
    unregMtr: 0,
}, {
    site: 'LUBUK SIKAPING',
    online: 175,
    offline: 15,
    invChannel: 5,
    invUsrPwd: 0,
    unregMtr: 5,
}, {
    site: 'LUBUK BASUNG',
    online: 97,
    offline: 3,
    invChannel: null,
    invUsrPwd: null,
    unregMtr: null,
}, {
    site: 'SIMPANG EMPAT',
    online: 150,
    offline: 20,
    invChannel: 10,
    invUsrPwd: 10,
    unregMtr: 10,
}, {
    site: 'BASO',
    online: 100,
    offline: 0,
    invChannel: 0,
    invUsrPwd: 0,
    unregMtr: 0,
}, {
    site: 'KOTO TUO',
    online: 150,
    offline: 0,
    invChannel: 0,
    invUsrPwd: 0,
    unregMtr: 0,
}];

export class RegCustomer {
    site: string;
    quantity: number;
}

const regCustomers: RegCustomer[] = [{
    site: 'BUKIT TINGGI',
    quantity: 250
}, {
    site: 'PADANG PANJANG',
    quantity: 300
}, {
    site: 'LUBUK SIKAPING',
    quantity: 200
}, {
    site: 'LUBUK BASUNG',
    quantity: 100
}, {
    site: 'SIMPANG EMPAT',
    quantity: 200
}, {
    site: 'BASO',
    quantity: 100
}, {
    site: 'KOTO TUO',
    quantity: 150
}];

@Injectable()
export class Service {
    getAssetsStatus(): AssetStatus[] {
        return assetsStatus;
    }

    getRegCustomers(): RegCustomer[] {
        return regCustomers;
    }
}

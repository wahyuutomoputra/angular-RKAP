export class Manufactur {
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public city: string,
        public province: string,
        public country: string,
        public postalCode: string,
        public telephone1: string,
        public telephone2: string,
        public facsimile: string,
        public email: string,
        public director: string,
        public directorEmail: string,
        public marketing: string,
        public marketingEmail: string,
        public engineering: string,
        public engineeringEmail: string,
        public engineeringPhone: string,
        public photo: Blob,
        public latitude: string,
        public longitude: string,
        public timeZone: string,
        public createdBy: string,
        public createdDate: Date,
        public modifiedBy: string,
        public modifiedDate: Date,
        public activationBy: string,
        public activationDate: Date,
        public deactivationBy: string,
        public deactivationDate: Date,
        public description: string,
        public appendix: string
    ) { }
}

export class AssetBrand {
    constructor(
        public id: string,
        public name: string,
        public manufactur: Manufactur,
        public createdBy: string,
        public createdDate: Date,
        public modifiedBy: string,
        public modifiedDate: Date,
        public activationBy: string,
        public activationDate: Date,
        public deactivationBy: string,
        public deactivationDate: Date,
        public description: string,
        public appendix: string
    ) { }
}

export class BrandType {
    constructor(
        public id: string,
        public name: string,
        public manufactur: Manufactur,
        public assetbrand: AssetBrand,
        public createdBy: string,
        public createdDate: Date,
        public modifiedBy: string,
        public modifiedDate: Date,
        public activationBy: string,
        public activationDate: Date,
        public deactivationBy: string,
        public deactivationDate: Date,
        public description: string,
        public appendix: string
    ) { }
}

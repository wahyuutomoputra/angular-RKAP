export class Site {
    constructor(
        public id: string,
        public companyCode: string,
        public siteName: string,
        public siteCodeExist: string,
        public siteType: SiteType,
        public parentSite: Site,
        public unit: string,
        public shortName: string,
        public address: string,
        public city: string,
        public province: string,
        public country: string,
        public postalCode: string,
        public telephone1: string,
        public telephone2: string,
        public facsimile: string,
        public email: string,
        public photo: Blob,
        public latitude: string,
        public longitude: string,
        public timeZone: string,
        public activationBy: string,
        public activationDate: Date,
        public deactivationBy: string,
        public deactivationDate: Date,
        public description: string,
        public appendix: string
    ) { }
}

export class SiteType {
    constructor(
        public name: string,
        public siteLevel:  number
    ) {}
}
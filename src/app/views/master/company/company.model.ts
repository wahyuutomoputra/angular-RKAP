export class Company {
    constructor(
        public id: string,
        public name: string,
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
        public activationCode: string,
        public deactivationBy: string,
        public deactivationDate: Date,
        public description: string,
        public appendix: string
    ) { }
}
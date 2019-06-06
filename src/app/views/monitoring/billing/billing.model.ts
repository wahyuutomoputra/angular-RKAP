export class Billing {
    constructor(
        public noMeter: string,
        public energyDelTot: string,
        public cumEnergyDelTot: string,
        public energyRecTot: string,
        public cumEnergyRecTot: string,
        public cumReactiveLaggingEnergy: string,
        public cumReactiveLeadingEnergy: string,
        public cumReactiveBillingEnergy: string,
        public siteName: string,
        public location: string,
        public locationName: string,
        public assetCode: string,
        public generationCode: string,
        public periode: string,
        public transmissionCode: string,
        public lastEvent: string,
        public distributionCode: string,
        public distributionName: string,
        public tdCode: string,
        public unitUp: string,
        public message: string,
        public modemNo: string,
        public simCard: string,
        public ipAddress: string
    ) { }
}

export class Search {
    Site: String;
    Location: string;
    Asset: string;
    Year: string;
    Unit: string;
}

export const DataIndex = [{
    'i': 0,
    'n': 'no'
}, {
    'i': 1,
    'n': 'siteCodeExist'
}, {
    'i': 2,
    'n': 'siteName'
}, {
    'i': 3,
    'n': 'locationCode'
}, {
    'i': 4,
    'n': 'locationName'
}, {
    'i': 5,
    'n': 'meterCode'
}, {
    'i': 6,
    'n': 'periode'
}, {
    'i': 7,
    'n': 'readDate'
}]

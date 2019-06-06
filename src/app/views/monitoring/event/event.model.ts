export class Search {
  Site: String;
  Location: string;
  Asset: string;
  MonthPeriode: string;
  Unit: string;
}

export class Location {
  LocationCode: string;
  Name: string;
}

export class Asset {
  Id: number;
  AssetCode: string;
}

export class Event {
  constructor(
    public siteCode: string,
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
  ) {}
}

export class Data2 {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class Data {
  names: string[];
  surnames: string[];
  positions: string[];
  cities: string[]
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
  'n': 'lastEvent'
}, {
  'i': 8,
  'n': 'eventCategory'
}, {
  'i': 9,
  'n': 'eventName'
}]

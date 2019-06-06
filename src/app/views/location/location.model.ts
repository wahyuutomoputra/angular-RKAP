export class Location {
  constructor(
    public address: string,
    public city: string,
    public country: string,
    public createdBy: string,
    public createdDate: string,
    public description: string,
    public email: string,
    public facsimile: string,
    public id: string,
    public latitude: string,
    public locationCode: string,
    public locationType: string,
    public longitude: string,
    public modifiedBy: string,
    public modifiedDate: string,
    public mutationCode: string,
    public mutationDate: Date,
    public name: string,
    public photoUrl: string,
    public postalCode: string,
    public power: string,
    public province: string,
    public punit: string,
    public siteCode: string,
    public status: string,
    public substation: string,
    public tariff: string,
    public telephone1: string,
    public telephone2: string,
  ) {}
}

export class LocationLAV {
  constructor(
    public id: string
  ) {}
}

export class LocationAttributeLAV {
  constructor(
    public id: string
  ) {}
}

export class LocationAttributeValue {
  constructor(
    public id: string,
    public locationId: string,
    public locationAttributeId: string,
    public dataType: string,
    public valueChar: string,
    public valueDate: string,
    public valueInteger: string,
    public valueNumber: string
  ) {}
}

export class LocationType {
  constructor(
    public id: string
  ) {}
}

export class Search {
  constructor(
    public SiteCodeExist: String,
    public Id: String
  ) { }
}

export const DataIndex = [{
  'i': 0,
  'n': 'id'
}, {
  'i': 1,
  'n': 'locationCode'
}, {
  'i': 2,
  'n': 'status'
}, {
  'i': 3,
  'n': 'name'
}, {
  'i': 4,
  'n': 'locationType_name'
}, {
  'i': 5,
  'n': 'site_siteCodeExist'
}, {
  'i': 6,
  'n': 'site_siteName'
}, {
  'i': 7,
  'n': 'address'
}, {
  'i': 8,
  'n': 'timeZone'
}, {
  'i': 9,
  'n': 'tariff'
}, {
  'i': 10,
  'n': 'power'
}, {
  'i': 11,
  'n': 'punit'
}, {
  'i': 12,
  'n': 'mutationDate'
}, {
  'i': 13,
  'n': 'substation'
}]

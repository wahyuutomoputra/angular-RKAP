export class Asset {
  constructor(
    public id: number,
    public assetCode: string,
    public assetTypeId: number,
    public locationId: number,
    public siteId: number,
    public brandId: number,
    public brandTypeId: number,
    public photoUrl: string,
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
  ) {}
}

export class AssetType {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class MeterClass {
  constructor(
    public id: number,
    public className: string
  ) {}
}

export class MeterProtocol {
  constructor(
    public id: number,
    public meterProtocol: string
  ) {}
}

export class ServicePlans {
  constructor(
    public id: number,
    public servicePlans: string
  ) {}
}

export class CommunicationType {
  constructor(
    public id: number,
    public communication: string
  ) {}
}

export class ConnectionType {
  constructor(
    public id: number,
    public connectionType: string
  ) {}
}


export class Location {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class Site {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class Brand {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class BrandType {
  constructor(
    public id: number,
    public name: string
  ) {}
}


export const FilterOperator = [{
  'i': '=',
  'o': ':'
}, {
  'i': 'contains',
  'o': '~'
}];
export const DataIndex = [{
  'i': 0,
  'n': 'assetTypeName'
}, {
  'i': 1,
  'n': 'assetCode'
}, {
  'i': 2,
  'n': 'locationCode'
}, {
  'i': 3,
  'n': 'locationName'
}, {
  'i': 4,
  'n': 'siteCodeExist'
}, {
  'i': 5,
  'n': 'siteName'
}, {
  'i': 6,
  'n': 'brandName'
}, {
  'i': 7,
  'n': 'brandTypeName'
}, {
  'i': 8,
  'n': 'installDate'
}, {
  'i': 9,
  'n': 'status'
}]

export class Time {
  constructor(
    public meterId: string,
    public updatedDate: Date,
  ) {}
}
export class Limit {
  constructor(
    public activated: string,
    public meterId: string,
    public minOverThresholdDuration: number,
    public minUnderThresholdDuration: number,
    public thresholdActive: number,
    public thresholdEmergency: number,
    public thresholdNormal: number,
  ) {}
}
export class Disconnect {
  constructor(
    public meterId: string,
    public status: string,
    public turnOn: boolean,
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

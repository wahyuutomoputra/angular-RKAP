export class Site {
  Site: string;
  MonthPeriode: string;
}

export class LocGrowthDaily {
  id: number;
  recapDate: any;
  companyCode: number;
  siteCode: number;
  total: number;

  constructor(
    id: number,
    recapDate: Date,
    companyCode: number,
    siteCode: number,
    total: number
    ) {
    this.id = id;
    this.recapDate = recapDate;
    this.companyCode = companyCode;
    this.siteCode = siteCode;
    this.total = total;
  }
}

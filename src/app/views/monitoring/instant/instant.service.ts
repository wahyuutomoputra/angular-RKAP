import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from './../../../app.constant';
import { DatePipe } from '@angular/common';
import notify from 'devextreme/ui/notify';


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

const search: Search = {
  Site: '',
  Location: '',
  Asset: '',
  MonthPeriode: '',
  Unit: ''
};

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

export const FilterOperator = [{
  'i': '=',
  'o': ':'
}, {
  'i': '==',
  'o': '='
}, {
  'i': 'contains',
  'o': '~'
}];
export const DataIndex = [{
  'i': 0,
  'n': 'no'
}, {
  'i': 1,
  'n': 'siteCode'
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
}]
// const date = new Date();
// const datePipe = new DatePipe('en-US');
// search.MonthPeriode = new Date(date.getFullYear(), date.getMonth()).toLocaleDateString();
// const parseDate = Date.parse(search.MonthPeriode);
// const datemonth = datePipe.transform(new Date(parseDate), 'yyyyMM');
// console.log('aaaa : ', search.MonthPeriode);

@Injectable()
export class InstantService {
  private resourceUrl = this.a.SERVER_URL + '/site';
  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlLoc = this.a.SERVER_URL + '/location';
  private resourceUrlAsset = this.a.SERVER_URL + '/asset';
  private resourceUrlSearch = this.a.SERVER_URL + '/trans_instant';
  private resourceUrlSearchDataAmr = this.a.SERVER_URL + '/trans_data_amr';
  private resourceUrlFilter =  this.a.SERVER_URL + '/trans_instant/main?';

  constructor(private http: HttpClient, private a: AppConstant) { }


  getDataInstants(data: any): Observable < any >  {
    console.log('data : ', data);
    return this.http.post(this.resourceUrlSearch + '/get_data', data);
  }

  getOne(id: any, id2: any): Observable < any > {
    console.log('this is it');
    return this.http.get(this.resourceUrlSearch + '/filter?search=meterCode:' +
        id + ',periode:' +
        id2);
  }

  getMerk(id: any): Observable < any > {
    return this.http.get(this.resourceUrlAsset + '/v2/filter?search=assetCode:' + id);
  }

  save(): Observable < any > {
    const datePipe = new DatePipe('en-US');
    if (search.MonthPeriode === '' || search.MonthPeriode === null) {
      const a = notify('Month Periode Is Required : ')

    } else {
      const parseDate = Date.parse(search.MonthPeriode);
      const datemonth = datePipe.transform(new Date(parseDate), 'yyyyMM');
      let unit;

      if (search.Unit === 'WILAYAH') {
        unit = search.Site === '' ? '' : 'siteLv3=' + search.Site + '&';
      } else if (search.Unit === 'CABANG' || search.Unit === 'AREA') {
        unit = search.Site === '' ? '' : 'siteLv4=' + search.Site + '&';
      } else {
        unit = search.Site === '' ? '' : 'siteCode=' + search.Site + '&';
      }

      // const siteUrl = search.Site === '' ? '' : 'siteCode=' + search.Site + '&';
      const locUrl = search.Location === '' ? '' : 'locationCode=' + search.Location + '&';
      const astUrl = search.Asset === '' ? '' : 'meterCode=' + search.Asset + '&';

      return this.http.get(this.resourceUrlSearch + '/main?size=100000000&page=0&periode=' +
        datemonth + '&' +
        unit +
        locUrl +
        astUrl);
    }
  }

  getSearch(): Search {
    return search;
  }

  getAllSite(): Observable < any > {
    return this.http.get(this.resourceUrl);
  }

  getSiteByID(data: any): Observable < any > {
    return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCodeExist:' + data);
  }

  getLocById(data): Observable < any > {
    return this.http.get(this.resourceUrlLoc + '/filter?search=locationCode:' + data);
  }

  getAssetById(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset + '/v2/filter?search=' + data);
  }

  getSiteByCode(data): Observable < any > {
    return this.http.get(this.resourceUrl + '/filter?search=siteCodeExist:' + data);
  }

  getAllData(data): Observable < any > {
    return this.http.get(this.resourceUrlSearchDataAmr + '/detail?locationCode=' + data);
  }

  getDataByFilter(a: any, page: number, size: number): Observable < any > {
    const datePipe = new DatePipe('en-US');
    const parseDate = Date.parse(search.MonthPeriode);
    const datemonth = datePipe.transform(new Date(parseDate), 'yyyyMM');
    return this.http.get(this.resourceUrlFilter + a + '&page=0&size=10000&periode=' + datemonth)
  }
}

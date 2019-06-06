import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  HttpClient
} from '@angular/common/http';
import {
 AppConstant
} from './../../../app.constant';
import {
  DatePipe
} from '@angular/common';
import notify from 'devextreme/ui/notify';

export class Search {
  constructor(
    public Site: String,
    public Location: string,
    public Asset: string,
    public MonthPeriode: string,
    public Unit: string
  ) {}
}

export class DateSearch {
  constructor(
    public startDate: string,
    public endDate: string
  ) {}
}

const overlappingModes = ['stagger', 'rotate', 'hide', 'none'];

const search: Search = {
  Site: '',
  Location: '',
  Asset: '',
  MonthPeriode: '',
  Unit: ''
};

export class Task {
  Id: number;
  Assigned: string;
}

export class Location {
  LocationCode: string;
  LocationName: string;
}

export class Asset {
  AssetCode: string;
  AssetType: string;
}

export class Loadprofile {
  siteName: string;
  location: string;
  locationName: string;
  assetCode: string;
  generationCode: string;
  periode: string;
  transmissionCode: string;
  lastEvent: string;
  distributionCode: string;
  distributionName: string;
  tdCode: string;
  unitUp: string;
  message: string;
  modemNo: string;
  simCard: string;
  ipAddress: string;
  country: string;
  val: number;
}

export class ArchitectureInfo {
  tanggal: string;
  kwhExportTotal: number;
  kvarhExportTotal: number;
  currentL3: number;
  voltageL3: number;
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
  'n': 'siteName'
}, {
  'i': 1,
  'n': 'locationCode'
}, {
  'i': 2,
  'n': 'locationName'
}, {
  'i': 3,
  'n': 'meterCode'
}, {
  'i': 4,
  'n': 'periode'
}];

@Injectable()
export class MonLoadprofileService {
  private resourceUrl = this.a.SERVER_URL + '/site';
  private resourceUrlLoc = this.a.SERVER_URL + '/location';
  private resourceUrlAsset = this.a.SERVER_URL + '/asset';
  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlSearch = this.a.SERVER_URL + '/trans_loadprofile';
  private resourceUrlSearchDataAmr = this.a.SERVER_URL + '/trans_data_amr';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getDataLoadprofile(data: any): Observable < any >  {
    console.log('data : ', data);
    return this.http.post(this.resourceUrlSearch + '/get_data', data);
  }

  getSearch(): Search {
    return search;
  }

  save(): Observable < any > {

    const datePipe = new DatePipe('en-US');
    if (search.MonthPeriode === '' || search.MonthPeriode == null) {
      notify('Month Periode Is Required : ')
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

      // let siteUrl = search.Site === '' ? '' : 'siteCode=' + search.Site + '&';
      const locUrl = search.Location === '' ? '' : 'locationCode=' + search.Location + '&';
      const astUrl = search.Asset === '' ? '' : 'meterCode=' + search.Asset + '&';

      return this.http.get(this.resourceUrlSearch + '/main?size=100000000&page=0&periode=' +
        datemonth + '&'
        // + siteUrl
        +
        locUrl +
        astUrl +
        unit);
    }
  }

  gridMainSearch(data: any): Observable < any > {

    const datePipe = new DatePipe('en-US');
    if (search.MonthPeriode === '' || search.MonthPeriode == null) {
      notify('Month Periode Is Required : ')
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

      const locUrl = search.Location === '' ? '' : 'locationCode=' + search.Location + '&';
      const astUrl = search.Asset === '' ? '' : 'meterCode=' + search.Asset + '&';

      return this.http.get(this.resourceUrlSearch + '/main?size=100000000&page=0&periode=' +
        datemonth + '&' +
        locUrl +
        astUrl +
        unit);
    }
  }

  getOne(id: any, id2: any): Observable < any > {
    return this.http.get(this.resourceUrlSearch + '/maindetailgrid?meterCode=' +
      id + '&periode=' +
      id2 + '&size=100000&page=0');
  }
  getOverlappingModes(): string[] {
    return overlappingModes;
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
    return this.http.get(this.resourceUrl + '/filter/v2?search=siteCodeExist:' + data + '& page=0 & size=10');
  }

  getAllData(data): Observable < any > {
    return this.http.get(this.resourceUrlSearchDataAmr + '/detail?locationCode=' + data);
  }

  searchByRangeDate(meterCode, data, data2): Observable < any > {
    const datePipe = new DatePipe('en-US');
    if (data === '' || data == null || data2 === '' || data2 == null) {
      notify('Start and End Date Is Required : ')
    } else {
      const parseDateStart = Date.parse(data);
      const parseDateEnd = Date.parse(data2);
      const dateMonthStart = datePipe.transform(new Date(parseDateStart), 'MM/dd/yyyy');
      const dateMonthEnd = datePipe.transform(new Date(parseDateEnd), 'MM/dd/yyyy');
      console.log('dateMonthStart : ', dateMonthStart);
      console.log('dateMonthEnd : ', dateMonthEnd);

      return this.http.get(this.resourceUrlSearch + '/maindetail?meterCode=' + meterCode + '&startDate=' +
        dateMonthStart + '&endDate=' +
        dateMonthEnd + '&size=100000000&page=0');
    }
  }
}

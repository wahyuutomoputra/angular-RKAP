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
import {
  Search
} from './billing.model';

const search: Search = {
  Site: '',
  Location: '',
  Asset: '',
  Year: '',
  Unit: ''
};

const overlappingModes = ['stagger', 'rotate', 'hide', 'none'];

@Injectable()
export class BillingService {
  private resourceUrl = this.a.SERVER_URL + '/site';
  private resourceUrlLoc = this.a.SERVER_URL + '/location';
  private resourceUrlAsset = this.a.SERVER_URL + '/asset';
  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlSearch = this.a.SERVER_URL + '/trans_billing';
  private resourceUrlSearchGrid = this.a.SERVER_URL + '/trans_billing/main?';
  private resourceUrlFilter = this.a.SERVER_URL + '/trans_billing/filter/v2?search=';
  private resourceUrlSearchDataAmr = this.a.SERVER_URL + '/trans_data_amr';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getSearch(): Search {
    return search;
  }

  getDataBillings(data: any): Observable < any >  {
    console.log('data : ', data);
    return this.http.post(this.resourceUrlSearch + '/get_data', data);
  }

  getOne(id: any, id2: any): Observable < any > {
    return this.http.get(this.resourceUrlSearch + '/filter?search=meterCode:' +
      id + ',periode~' +
      id2);
  }

  getOverlappingModes(): string[] {
    return overlappingModes;
  }

  save(page: number, size: number): Observable < any > {
    console.log('this page : ', page);
    console.log('this size : ', size);
    const datePipe = new DatePipe('en-US');
    if (search.Year === '' || search.Year == null) {
      notify('Month Periode Is Required : ');
    } else {
      const parseDate = Date.parse(search.Year);
      const datemonth = datePipe.transform(new Date(parseDate), 'yyyy');
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

      // return this.http.get(this.resourceUrlSearch + '/mains?size=' + size + '&page=' + page + '&periode=' +
      //   datemonth + '&' +
      //   locUrl +
      //   astUrl +
      //   unit);

    return this.http.get(this.resourceUrlSearch + '/main?size=10000&page=0&periode=' +
        datemonth + '&' +
        locUrl +
        astUrl +
        unit);

    }
  }

  getSiteByID(data: any): Observable < any > {
    console.log('data id by _event :', data);
    return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCodeExist:' + data);
  }

  getLocById(data): Observable < any > {
    return this.http.get(this.resourceUrlLoc + '/filter?search=locationCode:' + data);
  }

  getAssetById(data): Observable < any > {
    console.log('asset id by _event :', data);
    return this.http.get(this.resourceUrlAsset + '/v2/filter?search=' + data);
  }

  getSiteByCode(data): Observable < any > {
    return this.http.get(this.resourceUrl + '/filter?search=siteCodeExist:' + data);
  }

  getAllData(data): Observable < any > {
    return this.http.get(this.resourceUrlSearchDataAmr + '/detail?locationCode=' + data);
  }

  page(page: number, size: number): Observable < any > {
    console.log('this page : ', page);
    console.log('this size : ', size);
    const datePipe = new DatePipe('en-US');
    if (search.Year === '' || search.Year == null) {
      notify('Month Periode Is Required : ');
    } else {
      const parseDate = Date.parse(search.Year);
      const datemonth = datePipe.transform(new Date(parseDate), 'yyyy');

    return this.http.get(this.resourceUrlSearch + '/v3/page/0/size/5?periode=201801');

    }
  }
  getDataByFilter(a: any, page: number, size: number): Observable<any> {
    const datePipe = new DatePipe('en-US');
    const parseDate = Date.parse(search.Year);
    const datemonth = datePipe.transform(new Date(parseDate), 'yyyy');
    // return this.http.get(this.resourceUrlFilter + a + '&page=' + page + '&size=' + size)
    console.log(this.resourceUrlSearchGrid + a + '&page=0&size=10000&periode=' + datemonth);
    return this.http.get(this.resourceUrlSearchGrid + a + '&page=0&size=10000&periode=' + datemonth)
  }
}

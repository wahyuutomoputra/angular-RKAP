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
} from './event.model';

const search: Search = {
  Site: '',
  Location: '',
  Asset: '',
  MonthPeriode: '',
  Unit: '',
};

@Injectable()
export class EventService {

  private resourceUrl = this.a.SERVER_URL + '/site';
  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlLoc = this.a.SERVER_URL + '/location';
  private resourceUrlAsset = this.a.SERVER_URL + '/asset';
  private resourceUrlSearch = this.a.SERVER_URL + '/trans_event';
  private resourceUrlSearchDetail = this.a.SERVER_URL + '/trans_event_detail';
  private resourceUrlSearchDataAmr = this.a.SERVER_URL + '/trans_data_amr';
  private resourceUrlFilter = this.a.SERVER_URL + '/trans_event/filter/v2?search=';
  private resourceUrlFilterGrid =  this.a.SERVER_URL + '/trans_event/main?';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getDataEvents(data: any): Observable < any > {
    console.log('data : ', data);
    return this.http.post(this.resourceUrlSearch + '/get_data', data);
  }

  save(): Observable < any > {
    const datePipe = new DatePipe('en-US');
    if (search.MonthPeriode === '' || search.MonthPeriode == null) {
      const a = notify('Month Periode Is Required !');

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
        unit +
        locUrl +
        astUrl);
      }
    }

    getOne(id: any, id2: any): Observable < any > {
      return this.http.get(this.resourceUrlSearchDetail + '/filter?search=meterCode:' +
        id + ',periode:' +
        id2);
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
      console.log(this.resourceUrlFilterGrid + a + '&page=0&size=10000&periode=' + datemonth);
      return this.http.get(this.resourceUrlFilterGrid + a + '&page=0&size=10000&periode=' + datemonth)
    }
  }

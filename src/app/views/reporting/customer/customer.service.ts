import {
  Injectable
} from '@angular/core';
import {
  Site
} from './customer.model';
import {
  Observable
} from 'rxjs/Observable';
import {
  HttpClient
} from '@angular/common/http';
import {
 AppConstant
} from '../../../app.constant';
import {
  Search
} from '../../monitoring/loadprofile/loadprofile.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomerService {

  search: Search = {
    Site: '',
    Location: '',
    Asset: '',
    MonthPeriode: '',
    Unit: ''
  };

  site: Site = {
    Site: '',
    MonthPeriode: null
  };

  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlSite = this.a.SERVER_URL + '/site';
  private resourceUrlLocGrowthDaily = this.a.SERVER_URL + '/recap_locgrowth_daily';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getAll(): Observable < any > {
    return this.http.get(this.resourceUrlLocGrowthDaily)
  }

  getAllBySiteCode(data: any): Observable < any > {
    return this.http.get(this.resourceUrlLocGrowthDaily + '/filter?search=siteCode:' + data);
  }

  getAllByData(data: any): Observable<any> {
    const siteCode = data.Site;
    const datePipe = new DatePipe('en-US');
    const parseDate = Date.parse(data.MonthPeriode);
    const periode = datePipe.transform(new Date(parseDate), 'yyyyMM');
    return this.http.get(this.resourceUrlLocGrowthDaily + '/filter?search=siteCode:' + siteCode + ',periode:' + periode);
  }

  getAllSite(): Observable < any > {
    return this.http.get(this.resourceUrlSite)
  }

  getSite() {
    return this.site;
  }

  getSiteByID(data: any): Observable < any > {
    return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCode~' + data);
  }
}

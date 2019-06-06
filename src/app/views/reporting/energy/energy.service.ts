import { Injectable } from '@angular/core';
import { Energy, Site } from './energy.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import {Search} from '../../monitoring/loadprofile/loadprofile.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class EnergyService {

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
  private resourceUrlRecapLoadProfile = this.a.SERVER_URL + '/recap_loadprofile';
  private resourceUrlSite = this.a.SERVER_URL + '/site';
  constructor(private http: HttpClient, private a: AppConstant) {}

  getSite() {
    return this.site;
  }

  getSiteByID(data: any): Observable<any> {
    return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCodeExist~' + data);
  }

  getAll(): Observable<any> {
    return this.http.get(this.resourceUrlRecapLoadProfile);
  }
  getAllByData(data: any): Observable<any> {
    const siteCodeExist = data.Site;
    const datePipe = new DatePipe('en-US');
    const parseDate = Date.parse(data.MonthPeriode);
    const periode = datePipe.transform(new Date(parseDate), 'yyyyMM');
    return this.http.get(this.resourceUrlRecapLoadProfile + '/filter?search=siteCode:' + siteCodeExist + ',periode:' + periode);
  }
  getAllSite(): Observable<any> {
    return this.http.get(this.resourceUrlSite);
  }
  getAllBySiteCode(data: any): Observable<any> {
    return this.http.get(this.resourceUrlRecapLoadProfile + '/filter?search=siteCode:' + data);
  }
}

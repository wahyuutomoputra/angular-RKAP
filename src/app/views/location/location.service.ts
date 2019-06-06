import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
 AppConstant
} from './../../app.constant';
import {
  Observable
} from 'rxjs/Observable';
import {
  Location
} from './location.model';

@Injectable()
export class LocationService {

  private limit = '&page=0&size=10';
  private resourceUrl = this.a.SERVER_URL + '/location';
  private resourceUrlPost = this.a.SERVER_URL + '/location/v2/post';
  private resourceUrlFilter = this.a.SERVER_URL + '/location/filter?search=locationCode:131099113339' + this.limit;
  private resourceUrlFilterV3 = this.a.SERVER_URL + '/location/filter/v3?search=';
  // private resourceUrlFilter = this.a.SERVER_URL + '/location/filter?search=locationCode:110000166060&page=0&size=10';
  private resourceUrlDetail = this.a.SERVER_URL + '/location/v2';
  private resourceUrlTransDataAmr = this.a.SERVER_URL + '/trans_data_amr/detail?locationCode=';
  private resourceUrlType = this.a.SERVER_URL + '/location_type';
  private resourceUrlFilterBySiteCode = this.a.SERVER_URL + '/location/filter/v3?search=site_siteCodeExist:';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getAllType(): Observable < any > {
    return this.http.get(this.resourceUrlType);
  }

  getAll(page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrl + '/page/' + page + '/size/' + size);
    // return this.http.get(this.resourceUrlFilter);
  }

  getAllByType(id: any): Observable < any > {
    return this.http.get(this.resourceUrl + '/siteType/' + id);
  }

  getDetailById(id: any): Observable < any > {
    return this.http.get(this.resourceUrlDetail + '/' + id)
  }

  getTransDataAmrByLocCode(locCode: any): Observable < any > {
    return this.http.get(this.resourceUrlTransDataAmr + locCode)
  }

  getDataBySiteCode(siteCode: any, page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrlFilterBySiteCode + siteCode + '&page=' + page + '&size=' + size)
  }

  save(location: Location): Observable < any > {
    return this.http.post(this.resourceUrlPost, location);
  }

  update(id: any, location: Location): Observable < any > {
    return this.http.put(this.resourceUrl + '/' + id, location);
  }

  getDataByFilter(a: any, page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrlFilterV3 + a + '&page=' + page + '&size=' + size)
  }

}

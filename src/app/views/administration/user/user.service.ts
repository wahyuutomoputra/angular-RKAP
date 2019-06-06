import { Injectable } from '@angular/core';
import { AppConstant } from 'app/app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/views/administration/user/user.model';

@Injectable()
export class UserService {
  // private resourceUrlUser = this.a.SERVER_URL + '/user_tab';
  private resourceUrlUser = this.a.SERVER_URL + '/system/user/table';
  private resourceUrlSite = this.a.SERVER_URL + '/site';
  private resourceUrlRole = this.a.SERVER_URL + '/user_role';
  private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';
  private resourceUrlLanguage = this.a.SERVER_URL + '/menu_language';
  private resourceUrlLocation = this.a.SERVER_URL + '/location_type';
  private resourceUrlFilterBySiteCode = this.a.SERVER_URL + '/user_tab/filter/v2?search=siteCodeExist:';
  private resourceUrlCompany = this.a.SERVER_URL + '/company';
  private resourceUrlSiteCodeExist = this.a.SERVER_URL + '/site/filter?search=siteCodeExist:'

  constructor(private http: HttpClient, private a: AppConstant) {}
  delete(data: any): Observable < any > {
    data.status = 'D';
    data.activationCode = 'N';
    return this.http.put(this.resourceUrlUser + '/v2/' + data.id, data)
  }
  setactive(data: any): Observable < any > {
    data.status = 'A';
    data.activationCode = 'Y';
    return this.http.put(this.resourceUrlUser + '/v2/' + data.id, data)
  }
  setinactive(data: any): Observable < any > {
    data.status = 'I';
    data.activationCode = 'N';
    return this.http.put(this.resourceUrlUser + '/v2/' + data.id, data)
  }
  save(data: User): Observable < any > {
    return this.http.post(this.resourceUrlUser + '/v2', data)
  }
  update(data: User): Observable < any > {
    return this.http.put(this.resourceUrlUser + '/v2/' + data.id, data)
  }
  getAll(): Observable < any > {
    return this.http.get(this.resourceUrlUser + '/filter/v2?search=status!D')
  }
  getAllSite(): Observable < any > {
    return this.http.get(this.resourceUrlSite)
  }
  getAllRole(): Observable < any > {
    return this.http.get(this.resourceUrlRole)
  }
  getAllCompany(): Observable < any > {
    return this.http.get(this.resourceUrlCompany)
  }
  getAllLanguage(): Observable < any > {
    return this.http.get(this.resourceUrlLanguage)
  }
  getAllLocation(): Observable < any > {
    return this.http.get(this.resourceUrlLocation)
  }
  getSiteByID(data: any): Observable < any > {
    return this.http.get(this.resourceUrlSite + '/filter?search=siteCode~' + data);
  }
  getBySiteCodeExist(data: any): Observable < any > {
    return this.http.get(this.resourceUrlSiteCodeExist + data);
  }
  getRoleByID(data: any): Observable < any > {
    return this.http.get(this.resourceUrlRole + '/filter?search=id:' + data);
  }
  getLocationByID(data: any): Observable<any> {
    return this.http.get(this.resourceUrlLocation + '/filter?search=id:' + data);
  }
  getLanguageByID(data: any): Observable < any > {
    return this.http.get(this.resourceUrlLanguage + '/filter?search=id:' + data);
  }
  getByName(name: any): Observable < any > {
    return this.http.get(this.resourceUrlUser + '/filter?search=name:' + name);
  }
  getDataBySiteCode(siteCode: any, page: number, size: number): Observable<any> {
    return this.http.get(this.resourceUrlFilterBySiteCode + siteCode + ',status!D&page=' + page + '&size=' + size)
  }
  getCompanyByID(data: any): Observable<any> {
    return this.http.get(this.resourceUrlCompany + '/filter?search=companyCode:' + data);
  }
  getByData(data: any): Observable < any > {
    return this.http.get(this.resourceUrlUser +
      '/filter?search=name:' + data.name +
      ',userId:' + data.userId +
      ',siteCode:' + data.siteCode +
      ',roleId:' + data.roleId +
      ',email:' + data.email
    );
  }
  getById(id: any): Observable < any > {
    return this.http.get(this.resourceUrlUser + '/' + id);
  }
}

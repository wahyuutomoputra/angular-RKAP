// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TargetTahunanService {

//   constructor() { }
// }
const Tahun: string[] = [
  '2019',
  '2020',
  '2021',
  '2022',
  '2023'
]

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { TargetTahunan, KategoriAktif } from './target-tahunan.model';

const simpleProducts: string[] = [ 'Y', 'N' ];

@Injectable()
export class TargetTahunanService {
  private resourceUrlTarget = this.a.SERVER_URL + '/system/TargetTahunan';
  private resourceUrlRoleAuth = this.a.SERVER_URL + '/role_menu_authorization';
  private resourceUrlMenu = this.a.SERVER_URL + '/menu_tab';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getRjpp(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/RJPP/table')
  }

  getTahun() : string[]{
    return Tahun;
  }

  getSasaran(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Sasaran/table')
  }

  getSimpleProducts(): string[] {
    return simpleProducts;
  }

  getById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlTarget + '/retrieve?token=' + token + '&tid=' + id)
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    //http://localhost:9092/system/RoleMenus/table?offset=0&limit=10
    //http://localhost:9092/system/RoleMenus/table?offset=10&limit=10
    return this.http.post < any > (this.resourceUrlTarget + '/table', {
      username : username,
      token : token
    })
  }

  getLimit(offset,limit): Observable<any> {
    offset = Number(offset)*Number(limit);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(this.resourceUrlTarget + '/table?offset=' + offset + '&limit='+limit);
    return this.http.post < any > (this.resourceUrlTarget+'/table?offset='+offset+'&limit='+limit, {
      username : username,
      token : token
    })
  }

  save(data: TargetTahunan): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    console.log(data);
    // data.isallowregistration = 1;
    return this.http.post < any > (this.resourceUrlTarget + '/insert', data)
  }

  update(data: TargetTahunan): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    console.log(data);
    /*
    if (data.isallowregistration = false) {
      data.isallowregistration = '1';
    } else {
      data.isallowregistration = '0';
    }
    */
    return this.http.post < any > (this.resourceUrlTarget + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlTarget + '/delete?token=' + token + '&visi_id=' + data.visi_id)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlTarget + '/retrieve?visi=' + roleName)
    //return this.http.get(this.resourceUrlRole + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlRoleAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlRoleAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlTarget +
      '/filter?search=id:' + data.id +
      ',roleName:' + data.roleName.toString().toUpperCase() +
      ',description:' + data.description
    );
  }

  getAllMenu(): Observable<any> {
    return this.http.get(this.resourceUrlMenu)
  }

  getAllRoleAuth(): Observable<any> {
    return this.http.get(this.resourceUrlRoleAuth)
  }

  deleteRoleAuth(id: any): Observable<any> {
    return this.http.delete(this.resourceUrlRoleAuth + '/' + id)
  }
}

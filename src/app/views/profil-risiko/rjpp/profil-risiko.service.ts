import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { ProfilRisiko, KategoriAktif } from './profil-risiko.model';
import { ProfilRisikoRJPPComponent } from './profil-risiko.component';

const simpleProducts: string[] = [ 'Y', 'N' ];
// const Rjpp: string[] = [
//   '2019',
//   '2020',
//   '2023'
// ]
// const Sasaran: string[] = [
//   'Sasaran Objektif',
//   'Sasaran Strategis',
//   'Inisiatif Strategis'
// ]
const Tahun: string[] = [
  '2019',
  '2020',
  '2021',
  '2022',
  '2023'
]

@Injectable()
export class ProfilRisikoService {
  private resourceUrlRole = this.a.SERVER_URL + '/system/ProfilRisiko';
  private resourceUrlRoleAuth = this.a.SERVER_URL + '/role_menu_authorization';
  private resourceUrlMenu = this.a.SERVER_URL + '/menu_tab';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getSimpleProducts(): string[] {
    return simpleProducts;
  }

  // getRjpp() : string[]{
  //   return Rjpp;
  // }

  // getSasaran() : string[]{
  //   return Sasaran;
  // }

  getTahun() : string[]{
    return Tahun;
  }

  getRjpp(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/RJPP/table')
  }

  getSasaran(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Sasaran/table')
  }

  getTaksonomi(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/RiskTaksonomi/table')
  }

  getDepartemen(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Departements/table')
  }

  getById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRole + '/retrieve?token=' + token + '&riskid=' + id)
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlRole + '/table', {
      username : username,
      token : token
    })
  }

  getLimit(offset,limit): Observable<any> {
    offset = Number(offset)*Number(limit);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(this.resourceUrlRole + '/table?offset=' + offset + '&limit='+limit);
    return this.http.post < any > (this.resourceUrlRole+'/table?offset='+offset+'&limit='+limit, {
      username : username,
      token : token
    })
  }

  save(data: ProfilRisiko): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    // data.isallowregistration = 1;
    return this.http.post < any > (this.resourceUrlRole + '/insert', data)
  }

  update(data: ProfilRisiko): Observable<any> {
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
    return this.http.post < any > (this.resourceUrlRole + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRole + '/delete?token=' + token + '&riskid=' + data.riskid)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlRole + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlRoleAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlRoleAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlRole +
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

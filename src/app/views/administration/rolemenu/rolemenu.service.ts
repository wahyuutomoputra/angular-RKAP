import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Rolemenu, KategoriAktif } from './rolemenu.model';

const simpleProducts: string[] = [ 'Y', 'N' ];

const daftarKategori: KategoriAktif[] = [{
  'ID': 0,
  'Nama': 'Tidak Diizinkan'
}, {
  'ID': 1,
  'Nama': 'Izinkan'
}];

@Injectable()
export class RolemenuService {
  private resourceUrlRoleMenu = this.a.SERVER_URL + '/system/RoleMenu';
  private resourceUrlRoleAuth = this.a.SERVER_URL + '/role_menu_authorization';
  private resourceUrlMenu = this.a.SERVER_URL + '/menu_tab';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getSimpleProducts(): string[] {
    return simpleProducts;
  }

  getDaftarKategori(): KategoriAktif[] {
    return daftarKategori;
  }

  getById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRoleMenu + '/retrieve?token=' + token + '&id=' + id)
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlRoleMenu + '/table', {
      username : username,
      token : token
    })
  }

  save(data: Rolemenu): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.createdate = today;
    data.createdby = username.toUpperCase();
    // data.isallowregistration = 1;
    return this.http.post < any > (this.resourceUrlRoleMenu + '/insert', data)
  }

  update(data: Rolemenu): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.updatedate = today;
    data.updatedby = username;
    //console.log('isdisplayed = ' + data.isdisplayed);
    console.log(data);
    /*
    if (data.isallowregistration = false) {
      data.isallowregistration = '1';
    } else {
      data.isallowregistration = '0';
    }
    */
    return this.http.post < any > (this.resourceUrlRoleMenu + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRoleMenu + '/delete?token=' + token + '&id=' + data.id)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlRoleMenu + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlRoleAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlRoleAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlRoleMenu +
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

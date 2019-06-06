import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Role, KategoriAktif, GetId, Rolemenu } from './role.model';

const simpleProducts: string[] = [ 'Y', 'N' ];

const daftarKategori: KategoriAktif[] = [{
  'ID': 0,
  'Nama': 'Non-Aktif'
}, {
  'ID': 1,
  'Nama': 'Aktif'
}];

export class List {
    menu_id: string;
    menu_description: string;
    parent_menu_id: string;
    anak: List[];
}



@Injectable()
export class RoleService {
  private resourceUrlVisi = this.a.SERVER_URL + '/system/UserRole';
  private resourceUrlSysMenu = this.a.SERVER_URL + '/system/SystemMenu';
  private resourceUrlRoleMenu = this.a.SERVER_URL + '/system/RoleMenus';
  private resourceUrlRoleMenu2 = this.a.SERVER_URL + '/system/RoleMenu';
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
    return this.http.get(this.resourceUrlVisi + '/retrieve?token=' + token + '&role_id=' + id)
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlVisi + '/table', {
      username : username,
      token : token
    })
  }

  getMenu(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlSysMenu + '/table', {
      username : username,
      token : token
    })
  }

  getMenuId(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(this.resourceUrlSysMenu + '/getMenu?username=' + data);
    return this.http.get(this.resourceUrlRoleMenu2 + '/getMenu?username=' + data)
    //return this.http.get(this.resourceUrlRoleMenu + '/retrieve?'+ data)
  }

  save(data: Role): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.createdate = today;
    data.createdby = username;
    // data.isallowregistration = 1;
    console.log(data);
    return this.http.post < any > (this.resourceUrlVisi + '/insert', data)
  }

  saveMenu(data: Rolemenu): Observable<any> {
    return this.http.post < any > (this.a.SERVER_URL + '/system/RoleMenu/insert', data)
  }

  update(data: Role): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.updatedate = today;
    data.updatedby = username;
    console.log('isdisplayed = ' + data.isdisplayed);
    console.log(data);
    /*
    if (data.isallowregistration = false) {
      data.isallowregistration = '1';
    } else {
      data.isallowregistration = '0';
    }
    */
    return this.http.post < any > (this.resourceUrlVisi + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlVisi + '/delete?token=' + token + '&role_id=' + data.role_id)
  }

  deleteAuth(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    console.log(data);
    return this.http.get(this.a.SERVER_URL + '/system/RoleMenu/delete?token=' + token + '&id=' + data)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlVisi + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlRoleAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlRoleAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlVisi +
      '/filter?search=id:' + data.id +
      ',roleName:' + data.roleName +
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

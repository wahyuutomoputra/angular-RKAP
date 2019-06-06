import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { SysMenu, KategoriAktif } from './sys-menu.model';

const simpleProducts: string[] = [ 'Y', 'N' ];

const daftarKategori: KategoriAktif[] = [{
  'ID': 0,
  'Nama': 'Non-Aktif'
}, {
  'ID': 1,
  'Nama': 'Aktif'
}];

@Injectable()
export class SysMenuService {
  private resourceUrlSysMenu = this.a.SERVER_URL + '/system/SystemMenu';
  private resourceUrlSysAuth = this.a.SERVER_URL + '/role_menu_authorization';
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
    return this.http.get(this.resourceUrlSysMenu + '/retrieve?token=' + token + '&menu_id=' + id)
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlSysMenu + '/table', {
      username : username,
      token : token
    })
  }

  getLimit(offset,limit): Observable<any> {
    offset = Number(offset)*Number(limit);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(this.resourceUrlSysMenu + '/table?offset=' + offset + '&limit='+limit);
    return this.http.post < any > (this.resourceUrlSysMenu+'/table?offset='+offset+'&limit='+limit, {
      username : username,
      token : token
    })
  }

  save(data: SysMenu): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.icon_style = 'fa fa-angle-right';
    data.registration_date = today;
    data.registration_by = username;
    // data.isallowregistration = 1;
    return this.http.post < any > (this.resourceUrlSysMenu + '/insert', data)
  }

  update(data: SysMenu): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.modified_date = today;
    data.modified_by = username;
    //console.log('isdisplayed = ' + data.isdisplayed);
    /*
    if (data.isallowregistration = false) {
      data.isallowregistration = '1';
    } else {
      data.isallowregistration = '0';
    }
    */
    return this.http.post < any > (this.resourceUrlSysMenu + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlSysMenu + '/delete?token=' + token + '&menu_id=' + data.menu_id)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlSysMenu + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlSysAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlSysAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlSysMenu +
      '/filter?search=id:' + data.id +
      ',roleName:' + data.roleName.toString().toUpperCase() +
      ',description:' + data.description
    );
  }

  getAllMenu(): Observable<any> {
    return this.http.get(this.resourceUrlMenu)
  }

  getAllRoleAuth(): Observable<any> {
    return this.http.get(this.resourceUrlSysAuth)
  }

  deleteRoleAuth(id: any): Observable<any> {
    return this.http.delete(this.resourceUrlSysAuth + '/' + id)
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Users, KategoriAktif, Provinsi } from './users.model';

const daftarKategori: KategoriAktif[] = [{
  'ID': 0,
  'Nama': 'Non-Aktif'
}, {
  'ID': 1,
  'Nama': 'Aktif'
}];

const daftarProvinsi: Provinsi[] = [{"province_id":"1","province":"Bali"},{"province_id":"2","province":"Bangka Belitung"},{"province_id":"3","province":"Banten"},{"province_id":"4","province":"Bengkulu"},{"province_id":"5","province":"DI Yogyakarta"},{"province_id":"6","province":"DKI Jakarta"},{"province_id":"7","province":"Gorontalo"},{"province_id":"8","province":"Jambi"},{"province_id":"9","province":"Jawa Barat"},{"province_id":"10","province":"Jawa Tengah"},{"province_id":"11","province":"Jawa Timur"},{"province_id":"12","province":"Kalimantan Barat"},{"province_id":"13","province":"Kalimantan Selatan"},{"province_id":"14","province":"Kalimantan Tengah"},{"province_id":"15","province":"Kalimantan Timur"},{"province_id":"16","province":"Kalimantan Utara"},{"province_id":"17","province":"Kepulauan Riau"},{"province_id":"18","province":"Lampung"},{"province_id":"19","province":"Maluku"},{"province_id":"20","province":"Maluku Utara"},{"province_id":"21","province":"Nanggroe Aceh Darussalam (NAD)"},{"province_id":"22","province":"Nusa Tenggara Barat (NTB)"},{"province_id":"23","province":"Nusa Tenggara Timur (NTT)"},{"province_id":"24","province":"Papua"},{"province_id":"25","province":"Papua Barat"},{"province_id":"26","province":"Riau"},{"province_id":"27","province":"Sulawesi Barat"},{"province_id":"28","province":"Sulawesi Selatan"},{"province_id":"29","province":"Sulawesi Tengah"},{"province_id":"30","province":"Sulawesi Tenggara"},{"province_id":"31","province":"Sulawesi Utara"},{"province_id":"32","province":"Sumatera Barat"},{"province_id":"33","province":"Sumatera Selatan"},{"province_id":"34","province":"Sumatera Utara"}];

export class List {
    menu_id: string;
    menu_description: string;
    parent_menu_id: string;
    anak: List[];
}



@Injectable()
export class UsersService {
  private resourceUrlPengguna = this.a.SERVER_URL + '/system/Pengguna';
  private resourceUrlSysMenu = this.a.SERVER_URL + '/system/SystemMenu';
  private resourceUrlRoleMenu = this.a.SERVER_URL + '/system/RoleMenus';
  private resourceUrlMenu = this.a.SERVER_URL + '/menu_tab';
  private resourceUrlRoleAuth = this.a.SERVER_URL + '/role_menu_authorization';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getDaftarProvinsi(): Provinsi[] {
    return daftarProvinsi;
  }

  getDaftarKategori(): KategoriAktif[] {
    return daftarKategori;
  }

  getById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlPengguna + '/retrieve?token=' + token + '&userid=' + id)
  }

  getByUsername(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(this.resourceUrlPengguna + '/retrieve?token=' + token + '&username=' + id)
    return this.http.get(this.resourceUrlPengguna + '/retrieve?token=' + token + '&username=' + id)
  }

  getRole(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/UserRole/table')
  }

  getAll(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlPengguna + '/table')
  }

  getMenu(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.resourceUrlSysMenu + '/table', {
      username : username,
      token : token
    })
  }

  save(data: Users): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    data.registration_date = today;
    data.registration_by = username;
    // data.isallowregistration = 1;
    console.log(data);
    return this.http.post < any > (this.resourceUrlPengguna + '/insert', data)
  }

  update(data: Users): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    //data.updatedate = today;
    //data.updatedby = username;
    //console.log('isdisplayed = ' + data.isdisplayed);
    console.log(data);
    /*
    if (data.isallowregistration = false) {
      data.isallowregistration = '1';
    } else {
      data.isallowregistration = '0';
    }
    */
    return this.http.post < any > (this.resourceUrlPengguna + '/update', data)
  }

  delete(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlPengguna + '/delete?token=' + token + '&userid=' + data.role_id)
  }

  deleteAuth(data: any): Observable<any> {
    /* data.activationCode = 'N';
    return this.http.put(this.resourceUrlRole + '/' + data.role_id, data)*/
    const token = localStorage.getItem('token');
    console.log(data);
    return this.http.get(this.a.SERVER_URL + '/system/RoleMenu/delete?token=' + token + '&id=' + data)
  }

  getByName(roleName: any): Observable<any> {
    return this.http.get(this.resourceUrlPengguna + '/filter?search=roleName:' + roleName.toString().toUpperCase());
  }

  saveRoleAuth(data: any) {
    return this.http.post(this.resourceUrlRoleAuth, data)
  }

  updateRoleAuth(data: any) {
    return this.http.put(this.resourceUrlRoleAuth + '/' + data.authId, data)
  }

  getByData(data: any): Observable<any> {
    return this.http.get(this.resourceUrlPengguna +
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


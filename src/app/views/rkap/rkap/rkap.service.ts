import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { Rkap, KategoriAktif, IndikatorInput, Rab } from './rkap.model';

const simpleProducts: string[] = [ 'Y', 'N' ];

@Injectable()
export class RkapService {
  private resourceUrlRole = this.a.SERVER_URL + '/system/RKAP';
  private resourceUrlRoleAuth = this.a.SERVER_URL + '/role_menu_authorization';
  private resourceUrlMenu = this.a.SERVER_URL + '/menu_tab';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getSimpleProducts(): string[] {
    return simpleProducts;
  }

  getRjpp(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/RJPP/table')
  }

  getSasaran(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Sasaran/table')
  }

  getProker(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/ProgramKerja/table')
  }

  getProkerById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.a.SERVER_URL + '/system/ProgramKerja/retrieve?token=' + token + '&prkid=' + id)
  }

  getPortofolio(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/GroupProduct/table')
  }

  getSatuan(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Satuan/table')
  }

  getDepartemen(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/Departements/table')
  }

  getProfilRisiko(): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/ProfilRisiko/table')
  }

  getIndikatorInput(id: any): Observable<any>{
    return this.http.get(this.a.SERVER_URL + '/system/IndikatorInput/query?rkapid='+id)
  }

  getById(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRole + '/retrieve?token=' + token + '&rkapid=' + id)
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

  save(data: Rkap): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    return this.http.post < any > (this.resourceUrlRole + '/insert', data)
  }

  saveRab(data: Rab): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    return this.http.post < any > (this.a.SERVER_URL + '/system/RAB/insert', data)
  }

  updateRab(data: Rab): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    console.log(data);
    return this.http.post < any > (this.a.SERVER_URL + '/system/RAB/update', data)
  }

  saveIndikatorInput(data: IndikatorInput): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    return this.http.post < any > (this.a.SERVER_URL + '/system/IndikatorInput/insert', data)
  }
  updateIndikatorInput(data: IndikatorInput): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    console.log(data);
    return this.http.post < any > (this.a.SERVER_URL + '/system/IndikatorInput/update', data)
  }
  removeIndikatorInput(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.a.SERVER_URL + '/system/IndikatorInput/delete?token=' + token + '&indid=' + data)
  }

  update(data: Rkap): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().slice(0, 10);
    console.log(data);
    return this.http.post < any > (this.resourceUrlRole + '/update', data)
  }

  delete(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.resourceUrlRole + '/delete?token=' + token + '&rkapid=' + data.rkapid)
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

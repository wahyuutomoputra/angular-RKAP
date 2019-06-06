import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from './../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Company } from './company.model';

@Injectable()
export class CompanyService {

    private resourceUrl = this.a.SERVER_URL + '/company';
    private resourceUrlPaging = this.a.SERVER_URL + '/company/page/0/size/20';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getAll(): Observable<any> {
        return this.http.get(this.resourceUrl + '/filter?search=activationCode!N');
    }

    save(company: Company): Observable<any> {
        console.log('company : ', company);
        return this.http.post(this.resourceUrl, company);
        // return null;
    }

    update(id: any, company: Company): Observable<any> {
        return this.http.put(this.resourceUrl + '/' + id, company);
    }

    delete(data: any): Observable<any> {
        data.activationCode = 'N';
        return this.http.put(this.resourceUrl + '/' + data.id, data)
    }

    getAllDropDown(): Observable<any> {
        return this.http.get(this.resourceUrl + '/dropdown');
    }

    getById(id: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/' + id);
    }
}

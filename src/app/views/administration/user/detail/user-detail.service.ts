import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConstant } from 'app/app.constant';
import { Observable } from "rxjs/Observable";

@Injectable()
export class Service {
    private resourceUrlLanguage = this.a.SERVER_URL + '/menu_language';
    private resourceUrlLocation = this.a.SERVER_URL + '/location_type';
    private resourceUrlCompany = this.a.SERVER_URL + '/company';
    constructor(private http: HttpClient, private a: AppConstant) { }

    getAllLanguage(): Observable<any> {
        return this.http.get(this.resourceUrlLanguage)
    }
    getAllLocation(): Observable<any> {
        return this.http.get(this.resourceUrlLocation)
    }
    getLanguageByID(data: any): Observable<any> {
        return this.http.get(this.resourceUrlLanguage + '/filter?search=id:' + data);
    }
    getLocationByID(data: any): Observable<any> {
        return this.http.get(this.resourceUrlLocation + '/filter?search=id:' + data)
    }
    getAllCompany(): Observable<any> {
        return this.http.get(this.resourceUrlCompany)
    }
    getCompanyByID(data: any): Observable<any> {
        return this.http.get(this.resourceUrlCompany + '/filter?search=companyCode:' + data);
    }
}

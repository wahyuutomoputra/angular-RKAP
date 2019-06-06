import { Injectable } from '@angular/core';
import { AppConstant } from 'app/app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service {
    private resourceUrlAssetBrand = this.a.SERVER_URL + '/master_asset_brand';
    constructor(private http: HttpClient, private a: AppConstant) { }
     getAllManufacttur(): Observable<any> {
        return this.http.get(this.resourceUrlAssetBrand)
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from './../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Manufactur, AssetBrand, BrandType } from './master_asset.model';
import { Brand } from 'app/views/asset/asset.model';
import { Type } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class MasterAssetService {
    private resourceUrl = this.a.SERVER_URL + '/location/page/0/size/50';
    // private resourceUrlFilter = SERVER_URL + '/location/filter?search=locationCode:131010109447&page=0&size=10';
    // private resourceUrlFilter = SERVER_URL + '/location/filter?search=locationCode:110000166060&page=0&size=10';
    private resourceUrlManufactur = this.a.SERVER_URL + '/master_asset_manufactur';
    private resourceUrlBrand = this.a.SERVER_URL + '/master_asset_brand';
    private resourceUrlType = this.a.SERVER_URL + '/master_asset_type';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getAllManufactur(): Observable<any> {
        return this.http.get(this.resourceUrlManufactur);
    }

    saveManufactur(data: Manufactur): Observable<any> {
        return this.http.post(this.resourceUrlManufactur + '/', data)
    }
    updateManufactur(data: Manufactur): Observable<any> {
        return this.http.put(this.resourceUrlManufactur + '/{id}' + data.id, data)
    }
    getById(id: any): Observable<any>{
        return this.http.get(this.resourceUrlManufactur + '/' + id);
    }

    getAllBrand(): Observable<any> {
        return this.http.get(this.resourceUrlBrand);
    }
    saveBrand(data: AssetBrand): Observable<any> {
        return this.http.post(this.resourceUrlBrand + '/_brand', data)
    }
    updateBrand(data: AssetBrand): Observable<any> {
        return this.http.put(this.resourceUrlManufactur + '/_brand/{id}' + data.id, data)
    }

    getAllType(): Observable<any> {
        return this.http.get(this.resourceUrlType);
    }

    saveType(data: Type): Observable<any> {
        return this.http.post(this.resourceUrlType + '/master_asset_type', data)
    }

    save(location: Location): Observable<any> {
        return this.http.post(this.resourceUrl, location);
    }

    update(id: any, location: Location): Observable<any> {
        return this.http.put(this.resourceUrl + '/' + id, location);
    }

}

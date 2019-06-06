import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from './../../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Site, SiteType } from './site.model';

export class Search {
    constructor(
        // public Site: String
    ) {}
}

const search: Search = {
    Site: ''
};

@Injectable()
export class SiteService {

    private resourceUrl = this.a.SERVER_URL + '/site';
    private resourceUrlFilter = this.a.SERVER_URL + '/site/v2/filter?search=';
    private resourceUrlPaging = this.a.SERVER_URL + '/site/page/0/size/20';
    private resourceUrlType = this.a.SERVER_URL + '/site_type';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getSearch(): Search {
        return search;
    }

    // getAll(page: number, size: number): Observable < any > {
    //     return this.http.get(this.resourceUrl + '' + '/page/' + page + '/size/' + size);
    // }

    getAll(): Observable < any > {
        return this.http.get(this.resourceUrl);
    }

    getAllType(): Observable<any> {
        return this.http.get(this.resourceUrlType);

    }

    getAllExport(): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    getAllByType(id: any): Observable<any> {
        return this.http.get(this.resourceUrl + '/siteType/' + id);
    }

    save(site: Site): Observable<any> {
        return this.http.post(this.resourceUrl, site);
    }

    update(id: any, site: Site): Observable<any> {
        return this.http.put(this.resourceUrl + '/' + id, site);
    }

    getAllDropDown(): Observable<any> {
        return this.http.get(this.resourceUrl + '/dropdown');
    }

    getDataOne(siteCodeExist: any, page: number, size: number): Observable < any > {
        return this.http.get(this.resourceUrlFilter + 'siteCodeExist~' + siteCodeExist + '&page=' + page + '&size=' + size)
      }
}

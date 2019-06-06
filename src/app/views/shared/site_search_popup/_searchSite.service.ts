import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../../app.constant';
import { DatePipe } from '@angular/common';
import notify from 'devextreme/ui/notify';

@Injectable()
export class SearchSiteService {
    private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getSiteByID(data: any): Observable<any> {
        return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCodeExist:' + data);
    }
}

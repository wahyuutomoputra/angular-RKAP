import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../app.constant';
import { DatePipe } from '@angular/common';
import notify from 'devextreme/ui/notify';


@Injectable()
export class SubstationSearchService {
    private resourceUrlLocType = this.a.SERVER_URL + '/location';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getLocType(): Observable<any> {
        return this.http.get(this.resourceUrlLocType + '/filter?search=locationType.id:2');
    }

}

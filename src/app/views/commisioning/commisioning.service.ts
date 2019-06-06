import {
  Injectable
} from '@angular/core';
import {
 AppConstant
} from './../../app.constant';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  NewDataAMR, UpdateStatusAsset
} from './commisioning.model';

@Injectable()
export class CommisioningService {
  private resourceUrldataAMR = this.a.SERVER_URL + '/trans_data_amr';
  private resourceUrlLoc = this.a.SERVER_URL + '/location';
  private resourceUrlAsset = this.a.SERVER_URL + '/asset';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getDataAMRByLoc(data): Observable < any > {
    return this.http.get(this.resourceUrldataAMR + '/detail?locationCode=' + data);
  }

  getDetailAssetById(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset + '/v2/' + data);
  }

  getDetailAssetByCode(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset + '/v2/filter?search=assetCode:' + data);
  }

  getLocByCode(data): Observable < any > {
    return this.http.get(this.resourceUrlLoc + '/filter?search=locationCode:' + data);
  }

  getLocById(data): Observable < any > {
    return this.http.get(this.resourceUrlLoc + '/filter?search=locationCode~' + data + '&page=0&size=10');
  }

  getMeterById(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset +
      '/v2/filter?search=assetCode~' + data + ',status:STOCK,assetTypeName:METER&page=0&size=10');
  }

  getCommDeviceById(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset +
      '/v2/filter?search=assetCode~' + data + ',status:STOCK,assetTypeName:MODEM&page=0&size=10');
  }

  getSimById(data): Observable < any > {
    return this.http.get(this.resourceUrlAsset +
      '/v2/filter?search=assetCode~' + data + ',status:STOCK,assetTypeName:SIM&page=0&size=10');
  }

  postNewDataAMR(newdataAMR: NewDataAMR): Observable < any > {
    return this.http.post(this.resourceUrldataAMR, NewDataAMR);
  }

  deleteDataAMR(id: any): Observable < any > {
    return this.http.delete(this.resourceUrldataAMR + '/' + id);
  }

  postStatusAsset(updateStatusAsset: UpdateStatusAsset): Observable < any > {
    return this.http.post(this.resourceUrlAsset + '/v2', updateStatusAsset);
  }

}

import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
 AppConstant
} from './../../app.constant';
import {
  Observable
} from 'rxjs/Observable';
import {
  Time,
  Limit,
  Disconnect,
  AssetType
} from './remote.model';

export class Search {
  constructor(
    public AssetCode: String
  ) {}
}

const search: Search = {
  AssetCode: ''
}
@Injectable()
export class RemoteService {

  private resourceUrlFilter = this.a.SERVER_URL + '/asset/v2/filter?search=';
  private resourceUrl = this.a.SERVER_URL + '/time/v2';
  private resourceUrlTime = this.a.SERVER_URL + '/read_date/';
  private resourceUrlTimePost = this.a.SERVER_URL + '/sync_date';
  private resourceUrlLimit = this.a.SERVER_URL + '/read_limiter/';
  private resourceUrlLimitPost = this.a.SERVER_URL + '/update_limiter';
  private resourceUrlDisconnect = this.a.SERVER_URL + '/read_disconnect/';
  private resourceUrlDisconnectPost = this.a.SERVER_URL + '/disconnect';
  private resourceUrlRemote = this.a.SERVER_URL + '/remote_result/';

  constructor(private http: HttpClient, private a: AppConstant) {}

  getAll(): Observable < any > {
    return this.http.get(this.resourceUrl);
  }
  getRemoteResult(trxId: any): Observable < any > {
    return this.http.get(this.resourceUrlRemote + trxId);
  }
  getReadTime(meterID: any): Observable < any > {
    return this.http.get(this.resourceUrlTime + meterID);
  }
  saveTime(body: Time): Observable < any > {
    return this.http.post(this.resourceUrlTimePost, body);
  }
  getReadLimiter(meterID: any): Observable < any > {
    return this.http.get(this.resourceUrlLimit + meterID);
  }
  saveLimiter(body: Limit): Observable < any > {
    return this.http.post(this.resourceUrlLimitPost, body);
  }
  getReadDisconnect(meterID: any): Observable < any > {
    return this.http.get(this.resourceUrlDisconnect + meterID);
  }
  saveDisconnect(body: Disconnect): Observable < any > {
    return this.http.post(this.resourceUrlDisconnectPost, body);
  }
  getDataOne(assetCode: any, page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrlFilter + 'assetCode~' + assetCode + '&page=' + page + '&size=' + size)
  }
}

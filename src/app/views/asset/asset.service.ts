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
  Asset,
  AssetType
} from './asset.model';

export class Search {
  constructor(
    public SiteCodeExist: String,
    public Id: String
  ) {}
}

const search: Search = {
  SiteCodeExist: '',
  Id: ''
}
@Injectable()
export class AssetService {

  private resourceUrl = this.a.SERVER_URL + '/asset/v2';
  private resourceUrlFilter = this.a.SERVER_URL + '/asset/v2/filter?search=';
  private resourceUrlType = this.a.SERVER_URL + '/asset_type';
  private resourceUrlClass = this.a.SERVER_URL + '/meter_class';
  private resourceUrlProtocol = this.a.SERVER_URL + '/ref_meter_protocol';
  private resourceUrlPlans = this.a.SERVER_URL + '/ref_service_plans';
  private resourceUrlCommType = this.a.SERVER_URL + '/ref_communication';
  private resourceUrlConnType = this.a.SERVER_URL + '/ref_connection_type';
  private resourceUrlChannel = this.a.SERVER_URL + '/meter_channel';
  private resourceUrlSite = this.a.SERVER_URL + '/site/filter?search=siteCode:';
  private resourceUrlSiteChildFilter = this.a.SERVER_URL + '/site_child/filter?search=siteCodeExist:';

  constructor(private http: HttpClient, private a: AppConstant) {}
  getSearch(): Search {
    return search;
  }
  getAll(page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrl + '' + '/page/' + page + '/size/' + size);
  }

  getAllClass(): Observable < any > {
    return this.http.get(this.resourceUrlClass);
  }

  getAllProtocol(): Observable < any > {
    return this.http.get(this.resourceUrlProtocol);
  }

  getAllPlans(): Observable < any > {
    return this.http.get(this.resourceUrlPlans);
  }

  getAllCommType(): Observable < any > {
    return this.http.get(this.resourceUrlCommType);
  }

  getAllConnType(): Observable < any > {
    return this.http.get(this.resourceUrlConnType);
  }

  getAllChannel(): Observable < any > {
    return this.http.get(this.resourceUrlChannel);
  }

  getAllType(): Observable < any > {
    return this.http.get(this.resourceUrlType);
  }

  getAllSite(): any[] {
    return [{
        'id': 1,
        'name': 'BANYUWANGI'
      },
      {
        'id': 2,
        'name': 'SURABAYA'
      }
    ]
  }

  getAllUserSite(): Observable<any> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(this.resourceUrlSiteChildFilter + currentUser.siteCodeExist);
  }

  getSiteBySiteCode(siteCode: any): Observable<any> {
    return this.http.get(this.resourceUrlSite + siteCode);
  }

  getAllBrand(): Observable < any > {
    return this.http.get(this.a.SERVER_URL + '/master_asset_brand');
  }

  getBrandByAssetTypeName(name: string): Observable < any > {
    return this.http.get(this.a.SERVER_URL + '/master_asset_brand/filter?search=assetType.name:"' + name + '"');
  }

  getAllBrandType(): Observable < any > {
    return this.http.get(this.a.SERVER_URL + '/master_asset_type');
  }

  getAllByType(id: any): Observable < any > {
    return this.http.get(this.resourceUrl + '/siteType/' + id);
  }

  getOne(id: any): Observable < any > {
    return this.http.get(this.resourceUrl + '/' + id);
  }

  save(asset: Asset): Observable < any > {
    return this.http.post(this.resourceUrl, asset);
  }

  update(id: any, asset: Asset): Observable < any > {
    return this.http.put(this.resourceUrl + '/' + id, asset);
  }
  getAllDropDown(): Observable < any > {
    return this.http.get(this.resourceUrl + '/dropdown');
  }
  getDataOne(a: any, page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrlFilter + 'siteCodeExist~' + a + '&page=' + page + '&size=' + size)
  }
  getDataByFilter(a: any, page: number, size: number): Observable < any > {
    return this.http.get(this.resourceUrlFilter + a + '&page=' + page + '&size=' + size)
  }

}

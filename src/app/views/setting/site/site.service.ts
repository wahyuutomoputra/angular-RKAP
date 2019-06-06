import { Injectable } from '@angular/core';
import { Site } from './site.model';
import {Observable} from 'rxjs/Observable';
import { AppConstant } from '../../../app.constant';
import {HttpClient} from '@angular/common/http';
import {Search} from '../../monitoring/loadprofile/loadprofile.service';

@Injectable()
export class SiteService {
    site: Site = {
        Site: '',
        CompanyCode: '',
        SiteType: '',
        Unit: '',
        ApplySettingProfile: '',
        CustomizeSetting: false,
        InheritSettingsForAllChildSite: false,
        TopVoltageTolerance: 0,
        BottomVoltageTolerance: 0,
        UnbalanceVoltageTolerance: 0,
        IncorrectVoltagePhaseRotationDetection: false,
        LossVoltagePhaseDetection: false,
        TopCurrentTolerance: 0,
        BottomCurrentTolerance: 0,
        UnbalanceCurrentTolerance: 0,
        IncorrectCurrentPhaseRotationDetection: false,
        LossCurrentPhaseDetection: false,
        MaxEnergyConsumptionUsageHour: 0,
        MinEnergyConsumptionUsageHour: 0,
        UnbalanceEnergyTolerance: 0,
        MaxPowerConsumptionUsageHour: 0,
        MinPowerConsumptionUsageHour: 0,
        UnbalancePowerTolerance: 0,
    }

    search: Search = {
      Site: '',
      Location: '',
      Asset: '',
      MonthPeriode: '',
      Unit: ''
    };

    private resourceUrlSiteChild = this.a.SERVER_URL + '/site_child';

    constructor(private http: HttpClient, private a: AppConstant) { }

    getSite(): Site {
        return this.site;
    }

    getSiteByID(data: any): Observable<any> {
      return this.http.get(this.resourceUrlSiteChild + '/filter?search=siteCodeExist:' + data);
    }
}

import {
  NgModule,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit
} from '@angular/core';
import {
  JsonPipe
} from '@angular/common';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';

import {
  DxTabPanelModule,
  DxCheckBoxModule,
  DxTemplateModule,
  DxFormModule,
  DxVectorMapModule,
  DxChartModule,
  DxMapModule,
  DxLoadIndicatorModule
} from 'devextreme-angular';



import {
  Company,
  Service
} from './detail.service';
import {
  MonLoadprofileService
} from '../../monitoring/loadprofile/loadprofile.service';
import {
  BillingService
} from '../../monitoring/billing/billing.service';
import {
  InstantService
} from '../../monitoring/instant/instant.service';

import {
  Marker,
  MapService
} from './_map';
import {
  SELECTOR
} from 'ngx-bootstrap/modal/modal-options.class';
import {
  LocationService
} from '../location.service';
import {
  DetailLoadProfileComponent
} from '../../monitoring/loadprofile/detail/_loadprofile';

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail.component.html',
  providers: [Service, MapService, MonLoadprofileService, BillingService, InstantService]
})
export class DetailComponent implements OnInit {

  @Input() addVisible;
  @Input() locCode;
  @Output() onHide = new EventEmitter();

  popupVisible: any;
  detailLoadprofile: any;
  companies: Company[];
  itemCount: number;
  LocationTypes: String[];
  Provinces: String[];
  Cities: String[];
  Units: String[];
  allResp: any;
  location: any;
  assetMeter: any;
  disAssetMeter: boolean;
  assetCommunication: any;
  disAssetCommunication: boolean;
  assetSim: any;
  disAssetSim: boolean;
  isLoaded = false;
  isDetLPGrid = false;
  detailLoadprofileGrid: any;
  detailBillingsGrid: any;
  detailInstantsPopup: any;

  customMarkerUrl: string;
  mapMarkerUrl: string;
  markers: Marker[];

  constructor(service: Service, mapService: MapService,
    @Inject(LocationService) private locationService: LocationService,
    @Inject(MonLoadprofileService) private lpService: MonLoadprofileService,
    @Inject(BillingService) private billService: BillingService,
    @Inject(InstantService) private instService: InstantService
  ) {
    this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
    this.markers = mapService.getMarkers();
    this.popupVisible = true;
  }

  ngOnInit() {
    this.locationService.getTransDataAmrByLocCode(this.locCode)
      .subscribe(
        (resp) => {
          console.log('resp', resp);
          this.location = resp.location;
          this.location.name = resp.site.name;
          this.location.siteName = resp.site.name;
          this.location.siteCodeExist = resp.site.siteCodeExist;
          if (resp.assetMeter) {
            this.location.meterCode = resp.assetMeter.assetCode;
          }

          this.detailLoadprofile = this.location;
          this.assetMeter = resp.assetMeter;
          this.disAssetMeter = resp.assetMeter === null;
          if (!this.disAssetMeter) {
            this.getLoadProfile(this.assetMeter.assetCode);
            this.getBilling(this.assetMeter.assetCode);
            this.getInstant(this.assetMeter.assetCode);
          }
          this.assetCommunication = resp.assetCommunication;
          this.disAssetCommunication = resp.assetCommunication === null;
          this.assetSim = resp.assetSim;
          this.disAssetSim = resp.assetSim === null;
          this.isLoaded = true;
          this.allResp = resp;

        }, err => {
          console.log(err);
        }
      );

  }
  getYearMonthNow(): string {
    const date = new Date();
    const month = date.getMonth() + 1;
    let monthString = '';

    if (month < 10) {
      monthString = '0' + month.toString();
    }
    return date.getFullYear().toString() + monthString;
  }
  getYearNow(): string {
    const date = new Date();
    return date.getFullYear().toString();
  }
  getLoadProfile(code: any) {
    this.lpService.getOne(this.assetMeter.assetCode, this.getYearMonthNow())
      .subscribe(res => {
        this.detailLoadprofileGrid = res;
      }, err => {
        console.log(err);
      })
  }
  getBilling(code: any) {
    this.billService.getOne(this.assetMeter.assetCode, this.getYearNow())
      .subscribe(res => {
        this.detailBillingsGrid = res;
      }, err => {
        console.log(err);
      })
  }
  getInstant(code: any) {
    this.instService.getOne(this.assetMeter.assetCode, this.getYearMonthNow())
      .subscribe(res => {
        this.detailInstantsPopup = res;
      }, err => {
        console.log(err);
      })
  }
  hide() {
    this.onHide.emit();
  }
  checkCustomMarker(data) {
    this.mapMarkerUrl = data.value ? this.customMarkerUrl : null;
  }
  showTooltips() {
    this.markers = this.markers.map(function (item) {
      item.tooltip.isShown = true;
      return item;
    });
  }
  onHideLoadprofile() {
    this.popupVisible = false;
  }
  onHideBilling() {
    this.popupVisible = false;
  }
  onHideInstant() {
    this.popupVisible = false;
  }
}

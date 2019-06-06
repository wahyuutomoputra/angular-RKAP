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
  Marker,
  MapService
} from './_map';
import {
  SELECTOR
} from 'ngx-bootstrap/modal/modal-options.class';


@Component({
  selector: 'app-detail-manufacture',
  templateUrl: './detail.component.html',
  providers: [Service, MapService]
})
export class DetailComponent  {

  @Input() popupManufacture;
  @Input() manufacture;
  @Output() onHideManufacture = new EventEmitter();

  companies: Company[];
  itemCount: number;
  siteTypes: String[];
  Provinces: String[];
  Cities: String[];
  Units: String[];
  isLoaded = false

  customMarkerUrl: string;
  mapMarkerUrl: string;
  markers: Marker[];


  constructor(service: Service, mapService: MapService,
    // @Inject(SiteService) private siteService: SiteService
  ) {
    this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
    this.markers = mapService.getMarkers();
  }

  // ngOnInit() {
  //   this.locationService.getTransDataAmrByLocCode(this.locCode)
  //     .subscribe(
  //       (resp) => {
  //         this.location = resp.location;
  //         this.assetMeter = resp.assetMeter;
  //         this.disAssetMeter = resp.assetMeter === null;
  //         this.assetCommunication = resp.assetCommunication;
  //         this.disAssetCommunication = resp.assetCommunication === null;
  //         this.assetSim = resp.assetSim;
  //         this.disAssetSim = resp.assetSim === null;
  //         this.isLoaded = true;
  //       }, err => {
  //         console.log(err);
  //       }
  //     );
  // }

  hide() {
    this.onHideManufacture.emit();
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
}

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
  DxLoadIndicatorModule
} from 'devextreme-angular';



import {
  Company,
  Service
} from './detail.service';

import {
  SELECTOR
} from 'ngx-bootstrap/modal/modal-options.class';
import { Brand } from 'app/views/asset/asset.model';


@Component({
  selector: 'app-detail-assetbrand',
  templateUrl: './detail.component.html',
  providers: [Service]
})
export class DetailBrandComponent  {

  @Input() popupAssetbrand;
  @Input() assetbrand;
  @Output() onHideAssetbrand = new EventEmitter();

  companies: Company[];
  itemCount: number;
  siteTypes: String[];
  Provinces: String[];
  Cities: String[];
  Units: String[];
  isLoaded = false

  hide() {
    this.onHideAssetbrand.emit();
  }
}

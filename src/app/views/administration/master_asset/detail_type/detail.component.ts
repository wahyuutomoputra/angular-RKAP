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
import { BrandType } from 'app/views/asset/asset.model';


@Component({
  selector: 'app-detail-type',
  templateUrl: './detail.component.html',
  providers: [Service]
})
export class DetailTypeComponent  {

  @Input() popupType;
  @Input() type;
  @Output() onHideType = new EventEmitter();

  companies: Company[];
  itemCount: number;
  siteTypes: String[];
  Provinces: String[];
  Cities: String[];
  Units: String[];
  isLoaded = false

  hide() {
    this.onHideType.emit();
  }
}

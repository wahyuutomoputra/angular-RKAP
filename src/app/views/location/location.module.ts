import {
  NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  LocationRoutingModule
} from './location-routing.module';

import {
  TranslateModule
} from '@ngx-translate/core';

import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxFormComponent,
  DxTabPanelModule,
  DxTemplateModule,
  DxMapModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxLoadIndicatorModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';


import {
  LocationComponent
} from './location.component';
import {
  DetailComponent
} from './detail/detail.component';
import {
  AddLocationComponent
} from './add/add.component';


import {
  SharedModule
} from '../shared/shared.module';

import {
  MonitoringModule
} from '../monitoring/monitoring.module';

@NgModule({
  imports: [
    CommonModule,
    LocationRoutingModule,
    DxButtonModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    TabsModule,
    TranslateModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxTreeListModule,
    DxMapModule,
    SharedModule,
    DxFileUploaderModule,
    DxLoadIndicatorModule,
    MonitoringModule
  ],
  declarations: [
    LocationComponent,
    DetailComponent,
    AddLocationComponent
  ],
  exports: [
  ]
})
export class LocationModule { }

import {
  NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AssetRoutingModule
} from './asset-routing.module';

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
  DxLoadIndicatorModule,
  DxValidatorModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  PaginationModule
} from 'ngx-bootstrap/pagination';

import {
  AssetComponent
} from './asset.component';

import {
  AssetEditComponent
} from './edit/asset-edit.component';

import {
  AssetDetailComponent
} from './detail/asset-detail.component';

import {
  SharedModule
} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    AssetRoutingModule,
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
    DxValidatorModule,
    PaginationModule
  ],
  declarations: [
    AssetComponent,
    AssetEditComponent,
    AssetDetailComponent
  ],
  exports: [
    AssetDetailComponent
  ]
})
export class AssetModule { }

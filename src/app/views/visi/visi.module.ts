import {
  NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  VisiRoutingModule
} from './visi-routing.module';

import {
  TranslateModule
} from '@ngx-translate/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxMapModule,
  DxTreeListModule,
  DxFileUploaderModule,
  DxLoadIndicatorModule,
  DxRadioGroupModule,
  DxValidatorModule,
  DxValidationSummaryModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  MasterAssetComponent
} from '../administration/master_asset/master_asset.component';

import { DetailComponent } from '../administration/master_asset/detail_manufacture/detail.component'
import { DetailBrandComponent } from '../administration/master_asset/detail_assetbrand/detail.component'
import { DetailTypeComponent } from '../administration/master_asset/detail_type/detail.component'

import {
  SharedModule
} from '../shared/shared.module';
//import {AddRoleComponent} from '../administration/role/add/role-add.component'
import { VisiComponent } from './visi.component';
import { AddVisiComponent } from './add/visi-add.component';
import { from } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    VisiRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule,
    DxRadioGroupModule,
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
    DxValidationSummaryModule
    ],
  declarations: [
    VisiComponent,
    AddVisiComponent,
  ],
  exports: [
  ],
  bootstrap: [
    //AddRoleComponent,
  ]
})
export class VisiModule { }

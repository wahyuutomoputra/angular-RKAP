import {
    NgModule
  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  import {
    MisiRoutingModule
  } from './misi-routing.module';
  
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
  import { MisiComponent } from './misi.component';
  import { AddMisiComponent } from './add/misi-add.component';
  import { from } from 'rxjs';
  
  @NgModule({
    imports: [
      CommonModule,
      MisiRoutingModule,
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
      MisiComponent,
      AddMisiComponent,
    ],
    exports: [
    ],
    bootstrap: [
      //AddRoleComponent,
    ]
  })
  export class MisiModule { }
  
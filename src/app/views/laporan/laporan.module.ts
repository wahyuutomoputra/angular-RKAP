import {
    NgModule
  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  import {
    LaporanRouting
  } from './laporan-routing.module';
  
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
  import { AddAssetBrandComponent } from 'app/views/administration/master_asset/add_assetbrand/brand-add.component';
  import { AddManufactureComponent } from 'app/views/administration/master_asset/add_manufacture/manufacture-add.component';
  import { AddTypeComponent } from 'app/views/administration/master_asset/add_type/type-add.component';
  import { MonitoringPenyerapanComponent } from './monitoring-penyerapan/monitoring-penyerapan.component';
  import { RekapitulasiReleaseComponent } from './rekapitulasi-release/rekapitulasi-release.component';

  
  @NgModule({
    imports: [
      CommonModule,
      LaporanRouting,
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
      //MasterAssetComponent,
      //DetailComponent,
      // DetailBrandComponent,
      // DetailTypeComponent,
      // AddAssetBrandComponent,
      // AddManufactureComponent,
      // AddTypeComponent,
      MonitoringPenyerapanComponent,
      RekapitulasiReleaseComponent
    ],
    exports: [
    ],
    bootstrap: [
      //AddRoleComponent,
    ]
  })
  export class Laporan { }

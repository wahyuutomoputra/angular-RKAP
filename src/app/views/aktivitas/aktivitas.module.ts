import {
    NgModule
  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  import {
    AktivitasRouting
  } from './aktivitas-routing.module';
  
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
    DxValidationSummaryModule,
    DxSchedulerModule,
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
  import { PengumumanComponent } from './pengumuman/pengumuman.component';
  import { AddPengumumanComponent } from './pengumuman/add-pengumuman/add-pengumuman.component';
  import { JadwalComponent } from './jadwal/jadwal.component';
import { AddJadwalComponent } from './jadwal/add-jadwal/add-jadwal.component';
  
  @NgModule({
    imports: [
      CommonModule,
      AktivitasRouting,
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
      DxValidationSummaryModule,
      DxSchedulerModule,
      ],
    declarations: [
      //MasterAssetComponent,
      //DetailComponent,
      // DetailBrandComponent,
      // DetailTypeComponent,
      // AddAssetBrandComponent,
      // AddManufactureComponent,
      // AddTypeComponent,
      PengumumanComponent,
      AddPengumumanComponent,
      JadwalComponent,
      AddJadwalComponent,
    ],
    exports: [
    ],
    bootstrap: [
      //AddRoleComponent,
    ]
  })
  export class Aktivitas { }

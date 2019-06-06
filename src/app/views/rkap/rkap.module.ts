import {
    NgModule
  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  import {
    RkapRouting
  } from './rkap-routing.module';
  
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
    DxPopupModule
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
  import { RKAPComponent } from './rkap/rkap.component';
  import { RkapReleaseComponent } from './rkap-release/rkap-release.component';
  import { AddRKAPComponent } from './rkap/add-rkap/add-rkap.component';
  import { AddRkapReleaseComponent } from './rkap-release/add-rkap-release/add-rkap-release.component';
  import { EntriNonRkapComponent } from './entri-non-rkap/entri-non-rkap.component';
  import { PersetujuanGmComponent } from './persetujuan-gm/persetujuan-gm.component';
  import { PersetujuanRenkoComponent } from './persetujuan-renko/persetujuan-renko.component';
  import { PersetujuanCofinComponent } from './persetujuan-cofin/persetujuan-cofin.component';
  import { PersetujuanKspkkComponent } from './persetujuan-kspkk/persetujuan-kspkk.component';
  import { PersetujuanVpkeuComponent } from './persetujuan-vpkeu/persetujuan-vpkeu.component';
  import { PersetujuanBodComponent } from './persetujuan-bod/persetujuan-bod.component';
  import { PaguAnggaranComponent } from './pagu-anggaran/pagu-anggaran.component';
  import { EntriRealisasiComponent } from './entri-realisasi/entri-realisasi.component';
  import { AddPaguAnggaranComponent } from './pagu-anggaran/add-pagu-anggaran/add-pagu-anggaran.component';
  import { PersetujuanMrComponent } from './persetujuan-mr/persetujuan-mr.component';
import { AddNonRkapComponent } from './entri-non-rkap/add-non-rkap/add-non-rkap.component';
import { AddPersetujuanGmComponent } from './persetujuan-gm/add-persetujuan-gm/add-persetujuan-gm.component';
import { DiskusiComponent } from './rkap/diskusi/diskusi.component';
import { PersetujuanComponent } from './persetujuan/persetujuan.component';
import { AddPersetujuanComponent } from './persetujuan/add-persetujuan/add-persetujuan.component';

  @NgModule({
    imports: [
      CommonModule,
      RkapRouting,
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
      DxFileUploaderModule,
      DxPopupModule
      ],
    declarations: [
      //MasterAssetComponent,
      //DetailComponent,
      // DetailBrandComponent,
      // DetailTypeComponent,
      // AddAssetBrandComponent,
      // AddManufactureComponent,
      // AddTypeComponent,
      RKAPComponent,
      RkapReleaseComponent,
      AddRKAPComponent,
      AddRkapReleaseComponent,
      EntriNonRkapComponent,
      PersetujuanGmComponent,
      PersetujuanRenkoComponent,
      PersetujuanCofinComponent,
      PersetujuanKspkkComponent,
      PersetujuanVpkeuComponent,
      PersetujuanBodComponent,
      PaguAnggaranComponent,
      EntriRealisasiComponent,
      AddPaguAnggaranComponent,
      PersetujuanMrComponent,
      AddNonRkapComponent,
      AddPersetujuanGmComponent,
      DiskusiComponent,
      PersetujuanComponent,
      AddPersetujuanComponent
    ],
    exports: [
    ],
    bootstrap: [
      //AddRoleComponent,
    ]
  })
  export class RkapModule { }
  
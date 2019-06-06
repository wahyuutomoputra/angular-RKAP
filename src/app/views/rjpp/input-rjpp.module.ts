import {
    NgModule
  } from '@angular/core';
  
  import { CommonModule } from '@angular/common';
  
  import {
    InputRjppRouting
  } from './input-rjpp-routing.module';
  
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
  import { RjppComponent } from './rjpp/rjpp.component';
  import { ObyektifComponent } from './sasaran-objektif/obyektif.component';
  import { StrategisComponent } from './sasaran-strategis/strategis.component';
  import { InisiatisComponent } from './inisiatif-strategis/inisiatis.component';
  import { ProgramKerjaComponent } from './program-kerja/program-kerja.component';
  import { TargetTahunanComponent } from './target-tahunan/target-tahunan.component';
  import { AddRJPPComponent } from './rjpp/add-rjpp/add-rjpp.component';
  import { AddObyektifComponent } from './sasaran-objektif/add/obyektif-add.component';
  import { AddStrategisComponent } from './sasaran-strategis/add/strategis-add.component';
  import { AddInisiatisComponent } from './inisiatif-strategis/add/inisiatis-add.component';
  import { AddProgramKerjaComponent } from './program-kerja/add-program-kerja/add-program-kerja.component';
  import { AddTargetComponent } from './target-tahunan/add/target-add.component'
//   import { AddTargetTahunanComponent } from './target-tahunan/add-target-tahunan/add-target-tahunan.component';
  
  @NgModule({
    imports: [
      CommonModule,
      InputRjppRouting,
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
      RjppComponent,
      ObyektifComponent,
      StrategisComponent,
      InisiatisComponent,
      ProgramKerjaComponent,
      TargetTahunanComponent,
      AddRJPPComponent,
      AddObyektifComponent,
      AddStrategisComponent,
      AddInisiatisComponent,
      AddProgramKerjaComponent,
      AddTargetComponent,
      //AddTargetTahunanComponent,
    ],
    exports: [
    ],
    bootstrap: [
      //AddRoleComponent,
    ]
  })
  export class InputRjpp { }

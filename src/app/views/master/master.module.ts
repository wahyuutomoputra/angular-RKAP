import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MasterRoutingModule
} from './master-routing.module';

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
  DxScrollViewModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  TableComponent
} from './table/table.component';
import {
  FormComponent
} from './form/form.component';
import {
  SubstationComponent
} from './substation/substation.component';
import {
  TemplateComponent
} from './template/template.component';
import {
  TabComponent
} from './template/tab/tab.component';
import {
  CompanyComponent
} from './company/company.component';
import {
  DetailCompanyComponent
} from './company/detail/detail.component';
import {
  CompanyEditComponent
} from './company/edit/company-edit.component';
import {
  CompanyAddComponent
} from './company/add/company-add.component';
import {
  SiteComponent
} from './site/site.component';
import {AddSiteComponent} from './site/add/add.component'
import {
  DetailComponent
} from './site/detail/detail.component';
import {
  SharedModule
} from '../shared/shared.module';
import { importExpr } from '@angular/compiler/src/output/output_ast';

@NgModule({
  imports: [
    CommonModule,
    MasterRoutingModule,
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
    DxScrollViewModule
  ],
  declarations: [
    TableComponent,
    FormComponent,
    CompanyComponent,
    DetailCompanyComponent,
    CompanyEditComponent,
    CompanyAddComponent,
    SiteComponent,
    AddSiteComponent,
    DetailComponent,
    SubstationComponent,
    TemplateComponent,
    TabComponent
  ],
  exports: [
    TabComponent
  ]
})
export class MasterModule {}

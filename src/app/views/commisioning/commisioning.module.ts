import {
  NgModule
} from '@angular/core';

import {
  CommisioningRoutingModule
} from './commisioning-routing.module';

import {
  TranslateModule
} from '@ngx-translate/core';
import {
  SharedModule
} from '../shared/shared.module'

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
  DxTreeListModule
} from 'devextreme-angular';

import {
  TabsModule
} from 'ngx-bootstrap/tabs';

import {
  CommisioningComponent
} from './commisioning.component';
import { CommonModule } from '@angular/common/';

@NgModule({
  imports: [
    CommonModule,
    CommisioningRoutingModule,
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
    SharedModule
  ],
  declarations: [
    CommisioningComponent
  ],
  exports: [
    CommisioningComponent
  ]
})
export class CommisioningModule {}

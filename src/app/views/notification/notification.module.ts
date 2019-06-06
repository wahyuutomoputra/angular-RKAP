import {
    NgModule
  } from '@angular/core';
  
  import {
   NotificationRoutingModule
  } from './notification-routing-module';
  
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
    NotificationComponent
  } from './notification.component';
  import {
    CommonModule 
  } from '@angular/common/';
  
  @NgModule({
    imports: [
      CommonModule,
      NotificationRoutingModule,
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
     NotificationComponent
    ],
    exports: [
     NotificationComponent
    ]
  })
  export class NotificationModule {}
  
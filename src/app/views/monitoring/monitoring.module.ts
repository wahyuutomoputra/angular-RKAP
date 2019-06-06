import { NgModule, AfterViewInit, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
  DxLookupModule,
  DxDateBoxModule,
  DxAccordionModule,
  /* auto complete test */
  DxAutocompleteModule
} from 'devextreme-angular';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { InstantComponent } from './instant/instant.component';
import { LoadprofileComponent } from './loadprofile/loadprofile.component';
import { EventComponent } from './event/event.component';
import { BillingComponent } from './billing/billing.component';
import { SharedModule } from '../shared/shared.module'
import { DetailBillingComponent } from './billing/detail/_detailbilling';
import { DetailLoadProfileComponent } from './loadprofile/detail/_loadprofile';
import { DetailEventComponent } from './event/detail/_detailevent';
import { DetailInstantComponent } from './instant/detail/_detailinstant';
import { DetailPopupInstantComponent } from './instant/detailpopup/_detail';
@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule,
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
    SharedModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
    /* auto complete*/
    DxAutocompleteModule
  ],
  declarations: [
    LoadprofileComponent,
    EventComponent,
    BillingComponent,
    InstantComponent,
    DetailEventComponent,
    DetailBillingComponent,
    DetailLoadProfileComponent,
    DetailInstantComponent,
    DetailPopupInstantComponent,
  ],
  exports: [
    DetailEventComponent,
    DetailBillingComponent,
    DetailLoadProfileComponent,
    DetailInstantComponent,
    DetailPopupInstantComponent,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule
  ]
})
export class MonitoringModule {}

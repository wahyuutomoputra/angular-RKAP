import { NgModule, AfterViewInit, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RemoteRoutingModule } from './remote-routing.module';
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
  DxSwitchModule,
  /* auto complete test */
  DxAutocompleteModule
} from 'devextreme-angular';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SyncComponent } from './sync/sync.component';
import { LimiterComponent } from './limitter/limiter.component';
import { DisconnectComponent } from './disconnect/disconnect.component';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RemoteRoutingModule,
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
    DxAutocompleteModule,
    DxSwitchModule
  ],
  declarations: [
    SyncComponent,
    LimiterComponent,
    DisconnectComponent
  ],
  exports: [
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxSwitchModule
  ]
})
export class RemoteModule {}

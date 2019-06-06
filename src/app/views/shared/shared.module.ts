import {
  NgModule,
  ElementRef
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  CommonModule
} from '@angular/common';
import {
  ConfirmationComponent
} from './_confirmation';
import {
  FormConfirmationComponent
} from './_formConfirmation';
import {
  ContextComponent
} from './_context';
import {
  DetailComponent
} from './_detail';
import {
  ProgressComponent
} from './_progress';
import {
  SiteSearchComponent
} from './_siteSearch';
import {
  SubstationSearchComponent
} from './_substationSearch';
import {
  getFilterStringFunction
} from './_filterString';
import {
  DxButtonModule,
  DxContextMenuModule,
  DxPopupModule,
  DxProgressBarModule,
  DxDataGridModule,
  DxFormModule,
  DxChartModule,
  DxSelectBoxModule,
  DxScrollViewModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxLookupModule,
  DxDateBoxModule,
  DxAccordionModule,
  /* auto complete test */
  DxAutocompleteModule
} from 'devextreme-angular';
import { SearchSiteComponent } from './site_search_popup/_searchSite.component';

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxContextMenuModule,
    DxPopupModule,
    DxProgressBarModule,
    DxDataGridModule,
    DxFormModule,
    DxChartModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
  ],
  declarations: [
    ConfirmationComponent,
    ContextComponent,
    DetailComponent,
    ProgressComponent,
    SiteSearchComponent,
    SubstationSearchComponent,
    FormConfirmationComponent,
    SearchSiteComponent
  ],
  exports: [
    ConfirmationComponent,
    FormConfirmationComponent,
    ContextComponent,
    DetailComponent,
    ProgressComponent,
    SiteSearchComponent,
    SubstationSearchComponent,
    DxButtonModule,
    DxContextMenuModule,
    DxPopupModule,
    DxProgressBarModule,
    DxDataGridModule,
    DxChartModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxTemplateModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
    SearchSiteComponent
  ]
})
export class SharedModule {}

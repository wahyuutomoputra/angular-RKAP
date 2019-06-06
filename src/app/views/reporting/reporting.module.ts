import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import {
  DxButtonModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxLookupModule,
  DxDateBoxModule,
  DxAccordionModule,
  /* auto complete test */
  DxAutocompleteModule,
  DxTextBoxModule,
  DxPivotGridModule,
  DxChartModule
} from 'devextreme-angular';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../shared/shared.module'
import { PowerComponent } from './power/power.component';
import {EnergyComponent} from './energy/energy.component';
import {CustomerComponent } from './customer/customer.component';
import {ReportingRoutingModule} from './reporting-routing.module';
@NgModule({
  imports: [
    CommonModule,
    ReportingRoutingModule,
    DxButtonModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
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
    DxPivotGridModule,
    DxChartModule
  ],
  declarations: [
    EnergyComponent,
    CustomerComponent,
    PowerComponent
  ],
  exports: [
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule
  ],
})
export class ReportingModule {}

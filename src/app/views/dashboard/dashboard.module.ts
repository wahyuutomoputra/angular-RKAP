import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  DxAccordionModule,
  DxAutocompleteModule,
  DxButtonModule, DxChartModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFormModule, DxLookupModule, DxPivotGridModule,
  DxSelectBoxModule,
  DxTabPanelModule, DxTextAreaModule,
  DxTextBoxModule,
  DxPieChartModule
} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
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
    SharedModule,
    DxLookupModule,
    DxDateBoxModule,
    DxAccordionModule,
    /* auto complete*/
    DxAutocompleteModule,
    DxPivotGridModule,
    DxChartModule,
    DxPieChartModule
  ],
  declarations: [ DashboardComponent]
})
export class DashboardModule { }

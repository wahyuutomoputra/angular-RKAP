import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';
import { DxChartModule, DxPieChartModule, DxDataGridModule } from 'devextreme-angular';

@NgModule({
    imports: [
        MonitoringRoutingModule,
        ChartsModule,
        DxChartModule,
        BsDropdownModule,
        DxPieChartModule,
        DxDataGridModule
    ],

    declarations: [MonitoringComponent]

})
export class MonitoringModule { }

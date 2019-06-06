import { NgModule } from '@angular/core';

import { DevextremeComponent } from './devextreme.component';
import { DevextremeRoutingModule } from './devextreme-routing.module';

import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxFormComponent
} from 'devextreme-angular';

import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    DevextremeRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxFormModule
  ],
  declarations: [DevextremeComponent,
    TableComponent,
    FormComponent
  ]
})
export class DevextremeModule { }

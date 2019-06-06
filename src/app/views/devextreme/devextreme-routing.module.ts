import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevextremeComponent } from './devextreme.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Devextreme'
    },
    children: [
      {
        path: 'table',
        component: TableComponent,
        data: {
          title: 'Table'
        }
      },
      {
        path: 'form',
        component: FormComponent,
        data: {
          title: 'Form'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevextremeRoutingModule { }

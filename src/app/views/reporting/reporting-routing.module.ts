import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CustomerComponent} from './customer/customer.component';
import { EnergyComponent } from './energy/energy.component';
import { PowerComponent } from './power/power.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reporting'
    },
    children: [
      {
        path: 'customergrowth',
        component: CustomerComponent,
        data: {
          title: 'Customer Growth'
        }
      },
      {
        path: 'energy',
        component: EnergyComponent,
        data: {
          title: 'Energy'
        }
      },
      {
        path: 'power',
        component: PowerComponent,
        data: {
          title: 'Power'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }

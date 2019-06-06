import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {ExecutiveComponent} from './executive.component';

const routes: Routes = [
  {
    path: '',
    component: ExecutiveComponent,
    data: {
      title: 'Executive Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutiveRoutingModule {}

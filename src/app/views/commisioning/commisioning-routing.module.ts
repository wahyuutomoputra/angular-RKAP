import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommisioningComponent } from './commisioning.component';

const routes: Routes = [
  {
    path: '',
    component: CommisioningComponent,
    data: {
      title: 'Commisioning'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommisioningRoutingModule { }

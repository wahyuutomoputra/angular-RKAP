import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationComponent } from './location.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Location'
    },
    children: [
      {
        path: '',
        component: LocationComponent,
        data: {
          title: 'Location'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

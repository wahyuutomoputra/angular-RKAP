import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadprofileComponent } from './loadprofile/loadprofile.component';
import { EventComponent } from './event/event.component';
import { BillingComponent } from './billing/billing.component';
import { InstantComponent } from './instant/instant.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Monitoring'
    },
    children: [
      {
        path: 'instant',
        component: InstantComponent,
        data: {
          title: 'Monitoring Instant'
        }
      },
      {
        path: 'loadprofile',
        component: LoadprofileComponent,
        data: {
          title: 'Monitoring Load Profile'
        }
      },
      {
        path: 'event',
        component: EventComponent,
        data: {
          title: 'Monitoring Event'
        }
      },
      {
        path: 'billing',
        component: BillingComponent,
        data: {
          title: 'Monitoring Billing'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }

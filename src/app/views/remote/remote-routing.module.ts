import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncComponent } from './sync/sync.component';
import { LimiterComponent } from './limitter/limiter.component';
import { DisconnectComponent } from './disconnect/disconnect.component';

const routes: Routes = [
  {
    path: '',
    component: SyncComponent,
    data: {
      title: 'Sync'
    }
  },
  {
    path: 'sync',
    component: SyncComponent,
    data: {
      title: 'Sync'
    }
  },
  {
    path: 'limit',
    component: LimiterComponent,
    data: {
      title: 'Limit'
    }
  },
  {
    path: 'disconnect',
    component: DisconnectComponent,
    data: {
      title: 'Disconnect/Reconnect'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoteRoutingModule { }

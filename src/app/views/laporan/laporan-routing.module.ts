import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { MonitoringPenyerapanComponent } from './monitoring-penyerapan/monitoring-penyerapan.component';
import { RekapitulasiReleaseComponent } from './rekapitulasi-release/rekapitulasi-release.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Laporan'
    },
    children: [
        {
          path: 'monitoring-penyerapan',
          component: MonitoringPenyerapanComponent,
          data: {
            title: 'Monitorig Penyerapan'
          }
        },
        {
            path: 'rekapitulasi-release',
            component: RekapitulasiReleaseComponent,
            data: {
              title: 'Rekapitulasi Release'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaporanRouting {
}

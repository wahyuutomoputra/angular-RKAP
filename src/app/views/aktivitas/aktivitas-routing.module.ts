import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { PengumumanComponent } from './pengumuman/pengumuman.component';
import { JadwalComponent } from './jadwal/jadwal.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Aktivitas'
    },
    children: [
        {
          path: 'pengumuman',
          component: PengumumanComponent,
          data: {
            title: 'Pengumuman'
          }
        },
        {
            path: 'jadwal',
            component: JadwalComponent,
            data: {
              title: 'Jadwal'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AktivitasRouting { }
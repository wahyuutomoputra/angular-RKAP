import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { RKAPComponent } from './rkap/rkap.component';
import { RkapReleaseComponent } from './rkap-release/rkap-release.component';
import { EntriNonRkapComponent } from './entri-non-rkap/entri-non-rkap.component';
import { PersetujuanGmComponent } from './persetujuan-gm/persetujuan-gm.component';
import { PersetujuanRenkoComponent } from './persetujuan-renko/persetujuan-renko.component';
import { PersetujuanCofinComponent } from './persetujuan-cofin/persetujuan-cofin.component';
import { PersetujuanKspkkComponent } from './persetujuan-kspkk/persetujuan-kspkk.component';
import { PersetujuanVpkeuComponent } from './persetujuan-vpkeu/persetujuan-vpkeu.component';
import { PersetujuanBodComponent } from './persetujuan-bod/persetujuan-bod.component';
import { PaguAnggaranComponent } from './pagu-anggaran/pagu-anggaran.component';
import { EntriRealisasiComponent } from './entri-realisasi/entri-realisasi.component';
import { PersetujuanMrComponent } from './persetujuan-mr/persetujuan-mr.component';
import { PersetujuanComponent } from './persetujuan/persetujuan.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'RKAP'
    },
    children: [
        {
          path: 'rkap',
          component: RKAPComponent,
          data: {
            title: 'RKAP'
          }
        },
        {
            path: 'rkap-release',
            component: RkapReleaseComponent,
            data: {
              title: 'RKAP Release'
            }
          },
          {
            path: 'entri-non-rkap',
            component: EntriNonRkapComponent,
            data: {
              title: 'Entri Non-RKAP'
            }
          },
          {
            path: 'persetujuan-gm',
            component: PersetujuanGmComponent,
            data: {
              title: 'Persetujuan GM'
            }
          },
          {
            path: 'persetujuan-renko',
            component: PersetujuanRenkoComponent,
            data: {
              title: 'Persetujuan Renko'
            }
          },
          {
            path: 'persetujuan-mr',
            component: PersetujuanMrComponent,
            data: {
              title: 'Persetujuan Manajemen Risiko'
            }
          },
          {
            path: 'persetujuan-cofin',
            component: PersetujuanCofinComponent,
            data: {
              title: 'Persetujuan Cofin'
            }
          },
          {
            path: 'persetujuan-kspkk',
            component: PersetujuanKspkkComponent,
            data: {
              title: 'Persetujuan KSPKK'
            }
          },
          {
            path: 'persetujuan-vpkeu',
            component: PersetujuanVpkeuComponent,
            data: {
              title: 'Persetujuan VP Keuangan'
            }
          },
          {
            path: 'persetujuan-bod',
            component: PersetujuanBodComponent,
            data: {
              title: 'Persetujuan BoD'
            }
          },
          {
            path: 'pagu-anggaran',
            component: PaguAnggaranComponent,
            data: {
              title: 'Pagu Anggaran'
            }
          },
          {
            path: 'entri-realisasi',
            component: EntriRealisasiComponent,
            data: {
              title: 'Entri Realisasi'
            }
          },
          {
            path: 'persetujuan',
            component: PersetujuanComponent,
            data: {
              title: 'Persetujuan'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkapRouting { }

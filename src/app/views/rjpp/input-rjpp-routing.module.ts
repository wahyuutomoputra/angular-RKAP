import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { RjppComponent } from './rjpp/rjpp.component';
import { ObyektifComponent } from './sasaran-objektif/obyektif.component';
import { StrategisComponent } from './sasaran-strategis/strategis.component';
import { InisiatisComponent } from './inisiatif-strategis/inisiatis.component';
import { ProgramKerjaComponent } from './program-kerja/program-kerja.component';
import { TargetTahunanComponent } from './target-tahunan/target-tahunan.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'RJPP'
    },
    children: [
        {
          path: 'rjpp',
          component: RjppComponent,
          data: {
            title: 'RJPP'
          }
        },
        {
            path: 'sasaran-objektif',
            component: ObyektifComponent,
            data: {
              title: 'Sasaran Objektif'
            }
          },
        {
            path: 'sasaran-strategis',
            component: StrategisComponent,
            data: {
              title: 'Sasaran Strategis'
            }
          },
          {
            path: 'inisiatif-strategis',
            component: InisiatisComponent,
            data: {
              title: 'Inisiatif Strategis'
            }
          },
          {
            path: 'program-kerja',
            component: ProgramKerjaComponent,
            data: {
              title: 'Program Kerja'
            }
          },
          {
            path: 'target-tahunan',
            component: TargetTahunanComponent,
            data: {
              title: 'Target Tahunan'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputRjppRouting { }
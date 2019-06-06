import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { ObyektifComponent } from './obyektif/obyektif.component';
import { StrategisComponent } from './strategis/strategis.component';
import { InisiatisComponent } from './inisiatis/inisiatis.component';
import { TargetTahunanComponent } from './target-tahunan/target-tahunan.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sasaran'
    },
    children: [
        {
          path: 'obyektif',
          component: ObyektifComponent,
          data: {
            title: 'Obyektif'
          }
        },
        {
            path: 'strategis',
            component: StrategisComponent,
            data: {
              title: 'Strategis'
            }
          },
          {
            path: 'inisiatis',
            component: InisiatisComponent,
            data: {
              title: 'Inisiatis'
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
export class SasaranRoutingModule { }

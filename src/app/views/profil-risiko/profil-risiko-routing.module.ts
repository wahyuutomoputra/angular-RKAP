import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { ProfilRisikoRJPPComponent } from './rjpp/profil-risiko.component';
import { ProfilRisikoComponent } from './rkap/profil-risiko.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Profil Risiko'
    },
    children: [
        {
          path: 'rjpp',
          component: ProfilRisikoRJPPComponent,
          data: {
            title: 'Profil Risiko RJPP'
          }
        },
        {
            path: 'rkap',
            component: ProfilRisikoComponent,
            data: {
              title: 'Profil Risiko RKAP'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRisikoRouting { }
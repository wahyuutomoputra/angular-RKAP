import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from '../administration/master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from '../administration/role/role.component';
import { SysMenuComponent } from '../administration/sys-menu/sys-menu.component';
import { VisiComponent } from './visi/visi.component';
import { MisiComponent } from './misi/misi.component';
import { GroupProductComponent } from './portofolio-produk/group-product.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Profil Perusahaan'
    },
    children: [
        {
          path: 'visi',
          component: VisiComponent,
          data: {
            title: 'Visi'
          }
        },
        {
            path: 'misi',
            component: MisiComponent,
            data: {
              title: 'Misi'
            }
          },
          {
            path: 'portofolio-produk',
            component: GroupProductComponent,
            data: {
              title: 'Portofolio Produk'
            }
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilPerusahaanRouting { }
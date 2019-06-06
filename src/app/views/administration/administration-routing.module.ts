import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterAssetComponent } from './master_asset/master_asset.component';
import { UserComponent } from 'app/views/administration/user/user.component';
import { RoleComponent } from './role/role.component';
import { SysMenuComponent } from './sys-menu/sys-menu.component';
import { VisiComponent } from './visi/visi.component';
import { MisiComponent } from './misi/misi.component';
import { RolemenuComponent } from './rolemenu/rolemenu.component';
import { SasaranComponent } from './sasaran/sasaran.component';
import { GroupProductComponent } from './group-product/group-product.component';
import { ProgramKerjaComponent } from './program-kerja/program-kerja.component';
import { RjppComponent } from './rjpp/rjpp.component';
import { RKAPComponent } from './rkap/rkap.component';
import { SatuanComponent } from './satuan/satuan.component';
import { TesComponent } from './tes/tes.component';
import { GroupTaksonomiComponent } from './group-taksonomi/group-taksonomi.component';
import { RiskTaksonomiComponent } from './risk-taksonomi/risk-taksonomi.component';
import { ProfilRisikoComponent } from './profil-risiko/profil-risiko.component';
import { PengumumanComponent } from './pengumuman/pengumuman.component';
import { PlanMitigasiComponent } from './plan-mitigasi/plan-mitigasi.component';
import { IndikatorInputComponent } from './indikator-input/indikator-input.component';
import { IndikatorOutputComponent } from './indikator-output/indikator-output.component';
import { DiskusiComponent } from './diskusi/diskusi.component';
import { HistoryComponent } from './history/history.component';
import { RabComponent } from './rab/rab.component';
import { DocumentRKAPComponent } from './document-rkap/document-rkap.component';
import { LogKirimEmailComponent } from './log-kirim-email/log-kirim-email.component';
import { RkapReleaseComponent } from './rkap-release/rkap-release.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administration'
    },
    children: [
      {
        path: 'master_asset',
        component: MasterAssetComponent,
        data: {
          title: 'Master Asset'
        }
      }, {
        path: 'users',
        component: UserComponent,
        data: {
          title: 'Users'
        }
      }, {
        path: 'role',
        component: RoleComponent,
        data: {
          title: 'Role'
        }
      },
      {
        path: 'sys-menu',
        component: SysMenuComponent,
        data: {
          title: 'System Menu'
        }
      },
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
        path: 'rolemenu',
        component: RolemenuComponent,
        data: {
          title: 'Role Menu Auth'
        }
      },
      {
        path: 'sasaran',
        component: SasaranComponent,
        data: {
          title: 'Sasaran'
        }
      },
      {
        path: 'group_product',
        component: GroupProductComponent,
        data: {
          title: 'Group Product'
        }
      },
      {
        path: 'program_kerja',
        component: ProgramKerjaComponent,
        data: {
          title: 'Program Kerja'
        }
      },
      {
        path: 'rjpp',
        component: RjppComponent,
        data: {
          title: 'RJPP'
        }
      },
      {
        path: 'rkap',
        component: RKAPComponent,
        data: {
          title: 'RKAP'
        }
      },
      {
        path: 'satuan',
        component: SatuanComponent,
        data: {
          title: 'Satuan'
        }
      },
      {
        path: 'tes',
        component: TesComponent,
        data: {
          title: 'Tes'
        }
      },
      {
        path: 'group-taksonomi',
        component: GroupTaksonomiComponent,
        data: {
          title: 'Group Taksonomi'
        }
      },
      {
        path: 'risk-taksonomi',
        component: RiskTaksonomiComponent,
        data: {
          title: 'Risk Taksonomi'
        }
      },
      {
        path: 'profil-risiko',
        component: ProfilRisikoComponent,
        data: {
          title: 'Profil Risiko'
        }
      },
      {
        path: 'pengumuman',
        component: PengumumanComponent,
        data: {
          title: 'Pengumuman'
        }
      },
      {
        path: 'plan-mitigasi',
        component: PlanMitigasiComponent,
        data: {
          title: 'Plan Mitigasi'
        }
      },
      {
        path: 'indikator-input',
        component: IndikatorInputComponent,
        data: {
          title: 'Indikator Input'
        }
      },
      {
        path: 'indikator-output',
        component: IndikatorOutputComponent,
        data: {
          title: 'Indikator Output'
        }
      },
      {
        path: 'diskusi',
        component: DiskusiComponent,
        data: {
          title: 'Diskusi'
        }
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: {
          title: 'History'
        }
      },
      {
        path: 'rab',
        component: RabComponent,
        data: {
          title: 'RAB'
        }
      },
      {
        path: 'document-rkap',
        component: DocumentRKAPComponent,
        data: {
          title: 'Dokumen RKAP'
        }
      },
      {
        path: 'log-kirim-email',
        component: LogKirimEmailComponent,
        data: {
          title: 'Log Kirim Email'
        }
      },
      {
        path: 'rkap-release',
        component: RkapReleaseComponent,
        data: {
          title: 'RKAP Release'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }

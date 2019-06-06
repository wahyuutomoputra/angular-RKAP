import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { SubstationComponent } from './substation/substation.component';
import { TemplateComponent } from './template/template.component';
import { TabComponent } from './template/tab/tab.component';
import { CompanyComponent } from './company/company.component';
import { CompanyEditComponent } from './company/edit/company-edit.component';
import { CompanyAddComponent } from './company/add/company-add.component';

import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master'
    },
    children: [
      {
        path: 'table',
        component: TableComponent,
        data: {
          title: 'Table'
        }
      },
      {
        path: 'form',
        component: FormComponent,
        data: {
          title: 'Form'
        }
      },
      {
        path: 'company',
        component: CompanyComponent,
        data: {
          title: 'Company'
        }
      },
      {
        path: 'company/edit/:id',
        component: CompanyEditComponent,
        data: {
          title: 'Company Edit'
        }
      },
      {
        path: 'company/add',
        component: CompanyAddComponent,
        data: {
          title: 'Company Add'
        }
      },
      {
        path: 'site',
        component: SiteComponent,
        data: {
          title: 'Site'
        }
      },
      {
        path: 'substation',
        component: SubstationComponent,
        data: {
          title: 'Substation'
        }
      },
      {
        path: 'template',
        component: TemplateComponent,
        data: {
          title: 'Template'
        }
      },
      {
        path: 'template/tab',
        component: TabComponent,
        data: {
          title: 'Tab'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

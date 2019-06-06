import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetComponent } from './asset.component';
import { AssetEditComponent } from './edit/asset-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    data: {
      title: 'Asset'
    }
  },
  {
    path: 'edit/:id',
    component: AssetEditComponent,
    data: {
      title: 'Asset Add/Edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }

import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ PagesRoutingModule, FormsModule ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }

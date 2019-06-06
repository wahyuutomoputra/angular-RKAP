import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';

import { AuthGuard } from './security/auth.guard';
import { TokenInterceptor } from './security/token.interceptor';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Import translate module
import { TranslateModule, TranslateLoader, MissingTranslationHandler, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppConstant } from './app.constant';
import { DxButtonModule } from 'devextreme-angular';

//import { PaginationModule } from 'ngx-bootstrap';

// export function createTranslateLoader(http) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

export function HttpLoaderFactory(http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    DxButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [
    AuthGuard,
    AppConstant,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

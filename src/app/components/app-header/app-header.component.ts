import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './../../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  providers: [AuthenticationService]
})
export class AppHeaderComponent {

  languages = [
    { 'name': 'English', 'flag': 'United-Kingdom.png', 'code': 'en' },
    { 'name': 'عربى', 'flag': 'Saudi Arabia.png', 'code': 'ar-ly' }
  ];

  constructor(
    private translate: TranslateService,
    private service: AuthenticationService
  ) {
    translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    console.log(language);
    this.translate.use(language);
  }

  logout() {
    this.service.setLogout();
    this.service.logout();
    location.reload();
  }

}

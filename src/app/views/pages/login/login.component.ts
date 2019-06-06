import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {
  AuthenticationService
} from './../../../service/index';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  type = 'password';
  show = false;
  eye = 'eye-slash';
  returnUrl: string;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(AuthenticationService) private service: AuthenticationService
  ) {}

  ngOnInit() {
    this.service.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
      this.eye = 'eye';
    } else {
      this.type = 'password';
      this.eye = 'eye-slash';
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  login() {
    // console.log('Krik3')
    this.service.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          // console.log('Hore');
          this.router.navigate(['/']);
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          // console.log('Nay');
          console.log(error);
          this.loading = false;
        });
  }

}

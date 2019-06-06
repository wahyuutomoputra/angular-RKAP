import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConstant } from './../app.constant';
import 'rxjs/add/operator/map';
import notify from 'devextreme/ui/notify';

@Injectable()
export class AuthenticationService {
  model: any = {};
  loading = false;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }

  constructor(private http: HttpClient, private a: AppConstant) {}

  login(username: string, password: string) {
    return this.http.post < any > (this.a.SERVER_URL + '/system/auth/login', { // /authentication/login
    // return this.http.post < any > (this.a.SERVER_URL + '/authentication/login', {
        username: username,
        password: password
      })
      .map(user => {
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.d) {
        // if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('username', username);
          localStorage.setItem('token', user.d);
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          // Gagal Login
          this.options.message = user.m;
          notify(this.options, 'error', 3000);
        }

        return user;
      });
  }

  setLogout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log(currentUser);
    this.http.post < any > (this.a.SERVER_URL + '/system/auth/logout', {
        username : username,
        token : token
      })
    .subscribe(resp => {
        console.log(resp);
    });
  }

  logout() {
    // remove user from local storage to log user out
    // console.log('deleteeeee');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getMenu() {
    // return this.http.get(this.a.SERVER_URL + '/authentication/get_menu');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post < any > (this.a.SERVER_URL + '/system/auth/getMenu', {
        username : username,
        token : token
      });
  }

}

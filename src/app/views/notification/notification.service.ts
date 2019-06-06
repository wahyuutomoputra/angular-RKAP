import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from './../../app.constant';
import { Observable } from 'rxjs/Observable';
import { Notification } from './notification.model';

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable()
export class NotificationService {

    // private resourceUrl = 'http://localhost:1366/notification';
    private resourceUrl = 'http://10.14.165.163:1366/notification/';

    constructor(private http: HttpClient, private a: AppConstant) { }

    // getAll(): Observable<any> {
    //     return this.http.get(this.resourceUrl);
    // }

    getAll(page: number, size: number): Observable < any > {
        return this.http.get(this.resourceUrl + '' + '?page=' + page + '&size=' + size)
    }

    connect() {
        // let socket = new SockJs(`http://10.14.165.163:8080/websocket-backend/socket`);
        let socket = new SockJs('http://10.14.165.163:1366/socket')
        // let socket = new SockJs(`http://localhost:8081/websocket-backend/socket`);

        let stompClient = Stomp.over(socket);
        
        return stompClient;
    }

}

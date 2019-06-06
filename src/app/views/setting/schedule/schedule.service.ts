import { Injectable, Inject } from '@angular/core';
import { Schedule } from './schedule.model';
import { AppConstant } from './../../../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleService{
    private resourceUrlSchedule = this.a.SERVER_URL + '/he_setting_scheduler';
    schedule: Schedule[] = [
        {
            id: 1,
            schedTime: "00.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: false
        },
        {
            id: 2,
            schedTime: "01.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 3,
            schedTime: "02.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 4,
            schedTime: "03.00",
            loadprofile: true,
            billing: true,
            instant: true,
            event: true
        },
        {
            id: 5,
            schedTime: "04.00",
            loadprofile: false,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 6,
            schedTime: "05.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 7,
            schedTime: "06.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 8,
            schedTime: "07.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 9,
            schedTime: "08.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 10,
            schedTime: "09.00",
            loadprofile: true,
            billing: false,
            instant: false,
            event: true
        },
        {
            id: 11,
            schedTime: "10.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 12,
            schedTime: "11.00",
            loadprofile: false,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 13,
            schedTime: "12.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        }, {
            id: 14,
            schedTime: "13.00",
            loadprofile: true,
            billing: false,
            instant: false,
            event: true
        }, {
            id: 15,
            schedTime: "14.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        }, {
            id: 16,
            schedTime: "15.00",
            loadprofile: true,
            billing: false,
            instant: false,
            event: true
        }, {
            id: 17,
            schedTime: "16.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 18,
            schedTime: "17.00",
            loadprofile: false,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 19,
            schedTime: "18.00",
            loadprofile: true,
            billing: false,
            instant: false,
            event: true
        },
        {
            id: 20,
            schedTime: "19.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 21,
            schedTime: "20.00",
            loadprofile: true,
            billing: true,
            instant: true,
            event: true
        },
        {
            id: 22,
            schedTime: "21.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
        {
            id: 23,
            schedTime: "22.00",
            loadprofile: true,
            billing: false,
            instant: false,
            event: true
        },
        {
            id: 24,
            schedTime: "23.00",
            loadprofile: true,
            billing: false,
            instant: true,
            event: true
        },
    ]
    constructor(private http: HttpClient, private a: AppConstant){
    }
    getSchedule(): Schedule[]{
        return this.schedule;
    }
    getAll(): Observable<any> {
        // return this.http.get(this.resourceUrl);
        return this.http.get(this.resourceUrlSchedule);
    }
}
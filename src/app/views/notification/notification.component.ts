import { Component, Inject, ViewChild } from '@angular/core';
import { NotificationService} from './notification.service';
import { error } from 'selenium-webdriver';
import { Notification } from './notification.model';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';
import notify from 'devextreme/ui/notify';
import {Router } from '@angular/router';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [NotificationService]
})
export class NotificationComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  gridDataSource: any = {};

  contextItems: any;
  target: any;
  menuVisible = false;
  detail: any;
  details: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;
  isDetail = false;
  isEdit = false;
  isAdd = false;
  NotificationDetail: any;
  Notification: any[];

  constructor(
    @Inject(NotificationService) private service: NotificationService,
        private router: Router
  ) {
    //   this.gridDataSource = new DataSource({
    //   load: function () {
    //     return service.getAll()
    //       .toPromise()
    //       .then(resp => {
    //         // console.log(resp);
    //         return resp;
    //       }, err => {
    //         console.log(err);
    //       });
    //   }
    // });
    this.gridDataSource = new DataSource({
      load: function (loadOptions) {
        // return service.getAll(0, 10)
        return service.getAll(loadOptions.skip / loadOptions.take, loadOptions.take)
          .toPromise()
          .then(
            resp => {
              return {
                data: resp.content,
                totalCount: resp.totalElements
              }
          }, err => {
            console.log(err);
          });
      }
    });


    /**
     * Push notifications
     */
    let stompClient = this.service.connect();

        stompClient.connect({}, frame => {

            stompClient.subscribe('/topic/notification', notifications => {
                // console.log(notifications);

                let jsonArray = JSON.parse(notifications.body);
                let data;
                jsonArray.forEach(function (o) {
                  data += o.message + ", ";
                });
                this.Notification = data;
                console.log(this.Notification);

            })

        });
  }

  cancel() {
    console.log('cancel');
  }

  onHideSite() {
    this.popupVisible = false;
  }

  onHidePopup() {
    this.popupVisible = false;
    console.log('this.popup : ', this.popupVisible);
  }

  onHideConf() {
    this.confVisible = false;
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }
}

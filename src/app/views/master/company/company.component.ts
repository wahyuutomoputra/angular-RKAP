import { Component, Inject, ViewChild } from '@angular/core';
import { CompanyService} from './company.service';
import { error } from 'selenium-webdriver';
import { Company } from './company.model';
import DataSource from 'devextreme/data/data_source';
import { SharedModule } from '../../shared/shared.module';
import { ContextItemService, ContextItem } from './_contextItems';
import 'rxjs/add/operator/toPromise';
import notify from 'devextreme/ui/notify';
import {Router } from '@angular/router';
import {DetailCompanyComponent} from './detail/detail.component';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService, ContextItemService]
})
export class CompanyComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  // dataSource: Company[];
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
  isCancel = false;
  isDetail = false;
  isEdit = false;
  isAdd = false;
  isDelete = false;
  companyDetail: any;
  company: any[];

  constructor(
    @Inject(CompanyService) private service: CompanyService,
    private CIService: ContextItemService,
        private router: Router
  ) {
    // this.search = this.service.getSearch();
    this.contextItems = CIService.getContextItems();

      this.gridDataSource = new DataSource({
      load: function () {
        return service.getAll()
          .toPromise()
          .then(resp => {
            // console.log(resp);
            return resp;
          }, err => {
            console.log(err);
          });
      },
      insert: function (values) {
        console.log('values company : ', values);
        return service.save(values).toPromise();
      },
      update: function (key, values) {
        return service.update(key.id, values).toPromise();
      },
    });
  }

  showMenu(event): void {
    console.log('event : ', event);
    this.target = event;
    this.menuVisible = true;
    this.detail = this.gridDataSource._items.filter(dataSource => dataSource.id === event)[0]
    this.details = this.detail;
    console.log('this.detail : ', this.detail);
    if (this.detail.activationCode === 'Y') {
      this.detail.activationCode = 'YES'
    } else if (this.detail.activationCode === 'N') {
      this.detail.activationCode = 'NO'
    }
  }
  itemClick(e) {
    console.log('e : ', e);
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      console.log('text: ', this.text)
      if (this.text === 'Detail') {
        this.popupVisible = true;
        this.isDetail = true;
        // console.log('popupVisible: ', this.popupVisible)
      } else if (this.text === 'Edit') {
        this.isEdit = true;
        this.router.navigate(['/master/company/edit', this.target]);
      } else if (this.text === 'Add') {
        this.isAdd = true;
        this.router.navigate(['/master/company/add']);
      } else if (this.text === 'Delete') {
        this.isDelete = true;
        this.confVisible = true;
      }
    }
  }
  delete() {
    this.confVisible = false;
    this.isDelete = false;
  }
  cancel() {
    console.log('cancel');
  }
  onCancelConf() {
    console.log('cancel');
  }
  onDeleteConf() {
    let userdel = null;
    this.service.getById(this.target).subscribe(resp => {
      userdel = resp;
      console.log(resp);
      this.service.delete(userdel).subscribe(resp2 => {
        notify({
          closeOnClick: true,
          displayTime: 5000,
          message: 'Item successfully deleted.'
        }, 'success');
        this.service.getAll().subscribe(resp3 => {
          this.gridDataSource = resp3;
        });
      })
    })
  }
  onHideSite() {
    this.popupVisible = false;
  }

  onHidePopup() {
    this.popupVisible = false;
    console.log('this.popup : ', this.popupVisible);
  }

  onHideConf() {
    this.isDelete = false;
    this.confVisible = false;
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }
}

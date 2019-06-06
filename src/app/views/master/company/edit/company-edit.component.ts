import {
  NgModule,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { error } from 'selenium-webdriver';
import 'rxjs/add/operator/toPromise';
import notify from 'devextreme/ui/notify';

import { AppConstant } from '../../../../app.constant';

import DataSource from 'devextreme/data/data_source';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxFormModule,
  DxSelectBoxComponent,
  DxButtonComponent,
  DxFileUploaderModule
} from 'devextreme-angular';

import { CompanyService } from './../company.service';
// import { SiteService } from './../../master/company/company.service';
import { Company } from './../company.model';
import { ContextItemService, ContextItem } from './../_contextItems';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
  providers: [CompanyService, ContextItemService]
})
export class CompanyEditComponent {

  company: any;
  companyTypes: Company[];
  @Input() popupVisible;
  @Input() details;
  @Output() onHideSite = new EventEmitter();
  sites: any;
  isLoaded = false;
  // brands: any;
  // brandTypes: any;
  // photos = this.a.SERVER_URL + '/asset/v2/files/meter.jpg';

  constructor(
    private service: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = route.snapshot.params['id'];
          this.service.getById(id)
            .subscribe(resp => {
              this.details = resp;
              this.sites = this.details;
              this.isLoaded = true;
            }, err => {
              console.log(err);
            });

    this.service.getAll()
      .subscribe(resp => {
        this.company = resp;
      }, err => {
        console.log(err);
      });
  }

  save() {
    this.service.update(this.details.id, this.details)
      .subscribe(res => {
        notify({
          closeOnClick: true,
          displayTime: 5000,
          message: 'Company Updated.'
        }, 'success');
        this.router.navigate(['/master/company']);
      }, err => {
        notify(err);
        console.log(err);
      })
  }

  cancel() {
    this.router.navigate(['/master/company']);
  }

}

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
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
  providers: [CompanyService, ContextItemService]
})
export class CompanyAddComponent {

  company: any;
  companyTypes: Company[];
  sites: any;
  @Input() popupVisible;
  @Input() details;
  @Output() onHideSite = new EventEmitter(); 
  isLoaded = true;
  confVisible = false;
  isCancel = false;
  // brands: any;
  // brandTypes: any;
  // photos = this.a.SERVER_URL + '/asset/v2/files/meter.jpg';

  constructor(
    private service: CompanyService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.company = {
      'name' : null,
      'shortName' : null,
      'address' : null,
      'city' : null,
      'province' : null,
      'country' : null,
      'postalCode' : null,
      'telephone1' : null,
      'telephone2' : null,
      'facsimile' : null,
      'email' : null,
      'timeZone' : null,
      'photoUrl' : null,
      'activationCode' : 'Y'
    }
    // const id = route.snapshot.params['id'];

    // this.service.getAll()
    //   .subscribe(resp => {
    //     this.company = resp;
    //   }, err => {
    //     console.log(err);
    //   }
    //   );

   // this.sites = this.service.getAllSite();

  //   this.service.getAllBrand()
  //     .subscribe(resp => {
  //       this.brands = resp;
  //     }, err => {
  //       console.log(err);
  //     }
  //     );

  //   this.service.getAllBrandType()
  //     .subscribe(resp => {
  //       this.brandTypes = resp;
  //     }, err => {
  //       console.log(err);
  //     }
  //     );

  //   this.service.getAllType()
  //     .subscribe(
  //     resp => {
  //       this.assetTypes = resp;
  //     }, err => {
  //       console.log(err);
  //     }
  //     );

  //   this.siteService.getAllDropDown()
  //     .subscribe(
  //     resp => {
  //       this.sites = resp;
  //     }, err => {
  //       console.log(err);
  //     }
  //     );
  }

  save() {
    this.service.save(this.company)
      .subscribe(res => {
        notify({
          closeOnClick: true,
          displayTime: 5000,
          message: 'Company Saved.'
        }, 'success');
        this.router.navigate(['/master/company']);
      }, err => {
        notify(err);
        console.log(err);
      })
  }

  cancel() {
    this.confVisible = true;
    this.isCancel = true;
    this.router.navigate(['/master/company']);
  }

}

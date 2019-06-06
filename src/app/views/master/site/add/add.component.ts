import {
  NgModule,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  error
} from 'selenium-webdriver';
import 'rxjs/add/operator/toPromise';
import notify from 'devextreme/ui/notify';

import {
 AppConstant
} from '../../../../app.constant';

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

import {
  SiteService
} from './../site.service';
import {
  Site,
  SiteType
} from './../site.model';
import {
  ContextItemService,
  ContextItem
} from './../_contextItems';
import {
  Marker,
  MapService
} from './_map';

@Component({
  selector: 'app-add-site',
  templateUrl: './add.component.html',
  // providers: [SiteService, ContextItemService]
  providers: [SiteService, MapService]
})

export class AddSiteComponent {
  @Input() addVisible;
  @Output() onHideAdd = new EventEmitter();
  site: any;
  sites: any;
  isLoaded = true;
  markers: Marker[];
  customMarkerUrl: string;
  mapMarkerUrl: string;
  confVisible = false;
  isSave = false;
  isCancel = false;
  siteTypes: SiteType[];
  isValidSite = false;

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }

  constructor(service: SiteService, mapService: MapService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(SiteService) private siteService: SiteService) {
    this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
    this.markers = mapService.getMarkers();

    this.site = {
      'siteCode': null,
      'siteName': null,
      'shortName': null,
      'address': null,
      'city': null,
      'province': null,
      'country': null,
      'postalCode': null,
      'telephone1': null,
      'telephone2': null,
      'facsimile': null,
      'email': null,
      'timeZone': null,
      'photoUrl': null,
    }

    this.siteService.getAllType()
      .subscribe(
        resp => {
          this.siteTypes = resp;
        }, err => {
          console.log(err);
        }
      );
  }

  save(e) {
    this.confVisible = true;
    this.isSave = true;
    this.isCancel = false;
    e.preventDefault();
  }
  cancel() {
    this.confVisible = true;
    this.isSave = false;
    this.isCancel = true;
  }
  onHideConf() {
    this.confVisible = false;
  }
  onSaveConf() {
    const tempLType = this.site.siteType;
    let postLType;
    if (tempLType === 'Customer') {
      postLType = '1';
    } else if (tempLType === 'Substation') {
      postLType = '2';
    } else if (tempLType === 'Meter Point') {
      postLType = '3';
    }
    // this.siteService.getSiteByID(this.site.siteCode)
    //   .subscribe(
    //     resp => {
    //       if (resp.length === 0) {
    //         this.options.message = 'Site doesn`t exist';
    //         notify(this.options, 'error', 3000);
    //         return;
    //       } else {
    //         this.site.siteCode = resp[0].siteCodeExist;
    //         this.site.locationType = postLType;
    //         if (this.site.mutationDate !== null) {
    //           this.site.mutationDate = new Date(this.site.mutationDate);
    //         }
    //         this.service.save(this.location)
    //           .subscribe(
    //             res => {
    //               this.options.message = 'Location saved';
    //               notify(this.options, 'success', 3000);

    //               this.hide();
    //             }, err => {
    //               const msg = err.error.message;
    //               console.log(msg);
    //               if (msg.includes('ConstraintViolationException')) {
    //                 this.options.message = 'Location Code Already Exist';
    //                 notify(this.options, 'error', 3000);
    //                 this.site.locationType = tempLType;
    //               }
    //             }
    //           )
    //       }
    //     }, err => {
    //       console.log(err);
    //     }
    //   )

  }
  onCancelConf() {
    this.addVisible = false;
    this.hide();
  }
  hide() {
    this.onHideAdd.emit();
  }
  checkCustomMarker(data) {
    this.mapMarkerUrl = data.value ? this.customMarkerUrl : null;
  }
  showTooltips() {
    this.markers = this.markers.map(function (item) {
      item.tooltip.isShown = true;
      return item;
    });
  }
}

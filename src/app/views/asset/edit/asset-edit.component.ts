import {
  Component,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  AfterViewInit,
  ElementRef
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
} from './../../../app.constant';

import DataSource from 'devextreme/data/data_source';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxFormModule,
  DxSelectBoxComponent,
  DxButtonComponent,
  DxFileUploaderModule,
  DxValidatorModule
} from 'devextreme-angular';

import {
  AssetService
} from './../asset.service';
import {
  SiteService
} from './../../master/site/site.service';
import {
  Asset,
  AssetType,
  MeterClass,
  MeterProtocol,
  ServicePlans,
  CommunicationType,
  ConnectionType
} from './../asset.model';
import {
  ContextItemService,
  ContextItem
} from './../_contextItems';
import {
  SiteSearchService
} from '../../shared/_siteSearch.service';


@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css'],
  providers: [AssetService, ContextItemService, SiteService, SiteSearchService]
})
export class AssetEditComponent implements AfterViewInit {
  @Input() addVisible;
  @Input() editId;
  @Output() onHideAddAsset = new EventEmitter();
  asset: any;
  assetTypes: AssetType[];
  meterClass: MeterClass[];
  meterProtocol: MeterProtocol[];
  servicePlans: ServicePlans[];
  commType: CommunicationType[];
  connType: ConnectionType[];
  authLevel = [{
    'name': 'NONE'
  }, {
    'name': 'LOW'
  }, {
    'name': 'HIGH'
  }, {
    'name': 'HIGHMD5'
  }, {
    'name': 'HIGHSHA1'
  }, {
    'name': 'HIGHGMAC'
  }, {
    'name': 'HIGHSHA256'
  }];
  connPort = [{
    'name': 'RS232'
  }, {
    'name': 'RS485'
  }];

  // meterChannel: MeterChannel[];
  sites: any;
  brands: any;
  brandsStore: any;
  brandTypes: any;
  brandTypesStore: any;
  assetAttribute: any;
  photos = this.a.SERVER_URL + '/asset/v2/files/meter.jpg';
  siteSearchVsb = false;
  confVisible = false;
  isChanged = false;
  isLoaded = false;
  isMeter = false;
  isModem = false;
  isConverter = false;
  isSim = false;
  isSave = false;
  isCancel = false;
  isValidAsset = false;
  isValidBrand = false;
  isValidClass = false;
  isValidProtocol = false;
  isValidChannel = false;
  authLevelSelected: any;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }

  constructor(
    private service: AssetService,
    private siteService: SiteService,
    private siteSearchService: SiteSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private a: AppConstant
  ) {
    // this.sites = this.service.getAllSite();
    this.service.getAllBrandType()
      .subscribe(resp => {
        this.brandTypes = resp;
        this.brandTypesStore = resp;
      }, err => {
        console.log(err);
      });
    this.service.getAllBrand()
      .subscribe(resp => {
        this.brands = resp;
        this.brandsStore = resp;
      }, err => {
        console.log(err);
      });


    this.service.getAllType()
      .subscribe(
        resp => {
          this.assetTypes = resp;
        }, err => {
          console.log(err);
        }
      );
    this.service.getAllClass()
      .subscribe(
        resp => {
          this.meterClass = resp;
        }, err => {
          console.log(err);
        }
      );
    this.service.getAllProtocol()
      .subscribe(
        resp => {
          this.meterProtocol = resp;
        }, err => {
          console.log(err);
        }
      );
    this.service.getAllPlans()
      .subscribe(
        resp => {
          this.servicePlans = resp;
        }, err => {
          console.log(err);
        }
      );
    this.service.getAllCommType()
      .subscribe(
        resp => {
          this.commType = resp;
        }, err => {
          console.log(err);
        }
      );
    this.service.getAllConnType()
      .subscribe(
        resp => {
          this.connType = resp;
        }, err => {
          console.log(err);
        }
      );
    // this.service.getAllChannel()
    //   .subscribe(
    //     resp => {
    //       this.meterChannel = resp;
    //     }, err => {
    //       console.log(err);
    //     }
    //   );

    // this.siteService.getAllDropDown()
    //   .subscribe(
    //     resp => {
    //       this.sites = resp;
    //     }, err => {
    //       console.log(err);
    //     }
    //   );
  }

  ngAfterViewInit() {
    if (this.editId !== null) {
      this.service.getOne(this.editId)
        .subscribe(resp => {
          this.asset = resp;
          this.isChanged = true;
          this.isValidAsset = true;
          this.isValidBrand = true;
          this.isValidClass = true;
          this.isValidProtocol = true;

          this.brands = this.brandsStore.filter(brand => brand.assetType.id === resp.assetTypeId);
          this.brandTypes = this.brandTypesStore.filter(type => type.masterAssetBrand.id === resp.brandId);

          if (this.asset.assetTypeId === 1) {
            this.isMeter = true
          } else if (this.asset.assetTypeId === 2) {
            this.isModem = true
          } else if (this.asset.assetTypeId === 3) {
            this.isConverter = true
          } else if (this.asset.assetTypeId === 4) {
            this.isSim = true
          }
        }, err => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        this.asset = {
          'id': null,
          'assetCode': null,
          'assetTypeId': null,
          'assetTypeName': null,
          'brandId': null,
          'brandName': null,
          'brandTypeId': null,
          'brandTypeName': null,
          'locationId': null,
          'locationCode': null,
          'locationName': null,
          'siteId': null,
          'siteCode': null,
          'siteName': null,
          'photoUrl': null,
          'registrationBy': null,
          'registrationDate': null,
          'activationBy': null,
          'activationDate': null,
          'deactivationBy': null,
          'deactivationDate': null,
          'activationCode': null,
          'description': null,
          'appendix': null,
          'modifiedBy': null,
          'modifiedDate': null,
          'dynamicData': this.assetAttribute,
          'installDate': null,
          'status': 'STOCK'
        };
      });
    }

    this.isLoaded = true;
  }
  changeBrand(e) {
    this.brandTypes = this.brandTypesStore.filter(type => type.masterAssetBrand.id === e.value);
    this.isValidBrand = true;
  }
  changeMeterClass(e) {
    this.asset.dynamicData.METER_CLASS.attributeValue = e.value;
    this.isValidClass = true;
  }
  changeMeterProtocol(e) {
    this.asset.dynamicData.METER_PROTOCOL.attributeValue = e.value;
    this.isValidProtocol = true;
  }
  changeMeterChannel(e) {
    this.isValidChannel = true;
  }
  changeAuthLevel(e) {
    this.asset.dynamicData.AUTHENTICATION_LEVEL.attributeValue = e.value;
    this.authLevelSelected = this.authLevel.filter(ds => ds.name === e.value)[0];
  }
  changeServicePlans(e) {
    this.asset.dynamicData.SERVICE_PLANS.attributeValue = e.value;
  }
  changeCommType(e) {
    this.asset.dynamicData.COMMUNICATION_TYPE.attributeValue = e.value;
  }
  changeConnType(e) {
    this.asset.dynamicData.CONNECTION_TYPE.attributeValue = e.value;
  }
  changeConnPort(e) {
    this.asset.dynamicData.CONNECTION_PORT.attributeValue = e.value;
  }
  changeAssetType(e) {
    this.isChanged = true;
    this.isMeter = false;
    this.isModem = false;
    this.isConverter = false;
    this.isSim = false;

    this.brands = this.brandsStore.filter(brand => brand.assetType.id === e.value);

    const type = this.asset.assetTypeId;
    if (type === 1) {
      this.isMeter = true;
      // harus native
      // this.service.getBrandByAssetTypeName('METER')
      //   .subscribe(resp => {
      //     this.brands = resp;
      //   }, err => {
      //     console.log(err);
      //   });
      this.asset.dynamicData = {
        'METER_PROTOCOL': {
          'attributeId': 1,
          'attributeName': 'METER_PROTOCOL',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'METER_CLASS': {
          'attributeId': 2,
          'attributeName': 'METER_CLASS',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'METER_CHANNEL_GROUP': {
          'attributeId': 3,
          'attributeName': 'METER_CHANNEL_GROUP',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'SERVICE_PLANS': {
          'attributeId': 4,
          'attributeName': 'SERVICE_PLANS',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'CERTIFICATE_ID': {
          'attributeId': 5,
          'attributeName': 'CERTIFICATE_ID',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'CERTIFICATE_DATE': {
          'attributeId': 6,
          'attributeName': 'CERTIFICATE_DATE',
          'attributeDataType': 'DATE',
          'attributeValue': null,
        },
        'CERTIFICATE_FILE': {
          'attributeId': 7,
          'attributeName': 'CERTIFICATE_FILE',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'USERNAME_METER': {
          'attributeId': 8,
          'attributeName': 'USERNAME_METER',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'PASSWORD_METER': {
          'attributeId': 9,
          'attributeName': 'PASSWORD_METER',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'PHYSICALADDRESS': {
          'attributeId': 10,
          'attributeName': 'PHYSICALADDRESS',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'LOGICALADDRESS': {
          'attributeId': 11,
          'attributeName': 'LOGICALADDRESS',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'AUTHENTICATION_LEVEL': {
          'attributeId': 12,
          'attributeName': 'AUTHENTICATION_LEVEL',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'IS_VERIFICATION': {
          'attributeId': 13,
          'attributeName': 'IS_VERIFICATION',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'USERNAME_VERIFICATION': {
          'attributeId': 14,
          'attributeName': 'USERNAME_VERIFICATION',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'PASSWORD_VERIFICATION': {
          'attributeId': 15,
          'attributeName': 'PASSWORD_VERIFICATION',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        }
      }

    } else if (type === 2) {
      this.isModem = true;

      this.asset.dynamicData = {
        'COMMUNICATION_TYPE': {
          'attributeId': 16,
          'attributeName': 'COMMUNICATION_TYPE',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'CONNECTION_TYPE': {
          'attributeId': 17,
          'attributeName': 'CONNECTION_TYPE',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'COMMUNICATION_PORT': {
          'attributeId': 18,
          'attributeName': 'COMMUNICATION_PORT',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'CONNECTION_PORT': {
          'attributeId': 19,
          'attributeName': 'CONNECTION_PORT',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        }
      }
    } else if (type === 3) {
      this.isConverter = true;

      this.asset.dynamicData = {
        'CONNECTION_PORT': {
          'attributeId': 22,
          'attributeName': 'CONNECTION_PORT',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'IP': {
          'attributeId': 20,
          'attributeName': 'IP',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        },
        'COMMUNICATION_PORT': {
          'attributeId': 21,
          'attributeName': 'COMMUNICATION_PORT',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        }
      }
    } else if (type === 4) {
      this.isSim = true;
      this.asset.dynamicData = {
        'IP': {
          'attributeId': 23,
          'attributeName': 'IP',
          'attributeDataType': 'CHAR',
          'attributeValue': null,
        }
      }
    }
    console.log(this.asset.dynamicData);
    this.isValidAsset = this.isChanged;
  }

  showInfo() {
    this.siteSearchVsb = true;
  }
  onHideSiteSearch(event) {
    this.asset.siteCodeExist = event.event;
    this.siteSearchVsb = false;
  }
  save(e) {
    this.confVisible = true;
    this.isSave = true;
    this.isCancel = false;
    event.preventDefault();
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
    // console.log(this.asset, this.editId)

    if (this.asset.assetTypeId === null) {
      return;
    } else {
      this.isValidAsset = true;
    }
    if (this.asset.brandId === null) {
      return;
    } else {
      this.isValidBrand = true;
    }
    this.siteSearchService.getSiteByID(this.asset.siteCodeExist)
      .subscribe(
        resp => {
          if (resp.length === 0) {
            this.options.message = 'Site doesn`t exist';
            notify(this.options, 'error', 3000);
            return;
          } else {
            this.asset.siteCode = resp[0].siteCode;
            this.asset.siteId = this.asset.siteCode;
            this.asset.status = 'STOCK';
            this.asset.activationCode = 'Y';
            if (typeof (this.authLevelSelected) !== 'undefined') {
              this.asset.dynamicData.AUTHENTICATION_LEVEL.attributeValue = this.authLevelSelected.name;
            }
            if (typeof (this.asset.mutationDate) !== 'undefined') {
              this.asset.mutationDate = new Date(this.asset.mutationDate);
            }
            if (this.isMeter) {
              const cd = this.asset.dynamicData.CERTIFICATE_DATE.attributeValue;
              if (typeof (cd) !== 'undefined' && cd !== null) {
                this.asset.dynamicData.CERTIFICATE_DATE.attributeValue =
                  new Date(this.asset.dynamicData.CERTIFICATE_DATE.attributeValue).getTime();
              }
            }
            let msgAction = 'Saved';
            if (this.editId !== null) {
              this.asset.id = this.editId;
              msgAction = 'Updated'
            }
            this.service.save(this.asset)
              .subscribe(
                res => {
                  this.options.message = 'Asset ' + msgAction;
                  notify(this.options, 'success', 3000);

                  this.hide();
                }, err => {
                  const msg = err.error.message;
                  if (msg.includes('ConstraintViolationException')) {
                    this.options.message = 'Asset Code Already Exist';
                    notify(this.options, 'error', 3000);
                  }
                }
              )
          }
        }, err => {
          console.log(err);
        }
      )

  }
  onCancelConf() {
    this.addVisible = false;
    this.hide();
  }

  hide() {
    this.onHideAddAsset.emit();
  }
}

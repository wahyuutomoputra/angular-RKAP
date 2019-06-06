import {
  NgModule,
  Component,
  ViewChild,
  enableProdMode,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTabPanelModule,
  DxCheckBoxModule,
  DxTemplateModule,
  DxFormModule,
  DxVectorMapModule,
  DxChartModule,
  DxMapModule,
  DxButtonComponent,
  DxFormComponent,
  DxLoadPanelModule,
  DxScrollViewComponent
} from 'devextreme-angular';

import {
  Location,
  AssetMeter,
  AssetCommDevice,
  AssetSim,
  NewDataAMR,
  UpdateStatusLocation,
  UpdateStatusAsset
} from './commisioning.model';

import {
  CommisioningService
} from './commisioning.service';

import {
  Marker,
  MapService
} from './_map';
import {
  SELECTOR
} from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-editing',
  templateUrl: './commisioning.component.html',
  providers: [CommisioningService, MapService]
})

export class CommisioningComponent implements AfterViewInit {
  @ViewChild(DxFormComponent) myform: DxFormComponent;

  search = {
    locationCode: '',
    location: '',
    MeterCode: '',
    Meter: '',
    commDeviceCode: '',
    commDevice: '',
    simCardCode: '',
    simCard: ''
  };

  Location = Location;
  AssetMeter = AssetMeter;
  AssetCommDevice = AssetCommDevice;
  AssetSim = AssetSim;

  newDataAMR = new NewDataAMR();
  updateStatusLocation = new UpdateStatusLocation();
  updateStatusAsset = new UpdateStatusAsset();

  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }

  text = '';

  @Input() addVisible;
  @Output() onHide = new EventEmitter();

  locationPopup = false;
  meterPopup = false;
  commDevicePopup = false;
  simPopup = false;

  locationTab = true;
  meterTab = true;
  commDeviceTab = true;
  simTab = true;

  btnMeter = false;
  btnCommDevice = false;
  btnSim = false;
  btnActive = false;
  btnDeactive = false;
  btnTest = false;

  testResult = false;
  ismodem = true;
  enablebtnAction = false;
  loadingVisible = false;

  confVisible = false;
  isSave = false;
  isCancel = false;
  isActive = false;
  isDeactive = false;

  dataAMRId: number;

  searchLocationById: any;
  searchMeterById: any;
  searchCommDeviceById: any;
  searchSimById: any;
  varlocationCode: string;

  customMarkerUrl: string;
  mapMarkerUrl: string;
  markers: Marker[];

  location: any;
  assetMeter: any;
  assetCommDevice: any;
  assetSim: any;


  constructor(private service: CommisioningService, mapService: MapService) {
    this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
    this.markers = mapService.getMarkers();

    if (localStorage.getItem('assetDetail') !== null) {
      const assetData = JSON.parse(localStorage.getItem('assetDetail'));

      service.getDetailAssetByCode(assetData.assetCode).subscribe(resp => {
        const data = resp.content[0];

        switch (data.assetTypeName) {
          case 'METER':
            this.getIdMeter(data.id);
            break;
          case 'CONVERTER':
          case 'MODEM':
            this.getIdCommDevice(data.id);
            break;
          case 'SIM':
            this.getIdSim(data.id);
            break;
          default:
            break;
        }

        this.getIdLoc(data.locationCode);

        localStorage.removeItem('assetDetail');
      })
    }

    // if (assetData.locationCode !== null) {
    //   this.getIdLoc(assetData.locationCode);
    // }

    /* get loc by id fix */
    this.searchLocationById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          a = loadOptions.filter[2];
          this.locationTab = false;
          return service.getLocById(a).toPromise().then(resp => {
            return resp;
          }, err => {
            console.log(err);
          });
        }
      }
    });

    /* get meter by id fix */
    this.searchMeterById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          a = loadOptions.filter[2];
          this.meterTab = false;
          return service.getMeterById(a).toPromise().then(resp => {
            return resp.content;
          }, err => {
            console.log(err);
          });
        }
      }
    });

    /* get Comm Device by id fix */
    this.searchCommDeviceById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          this.commDeviceTab = false;
          a = loadOptions.filter[2];
          return service.getCommDeviceById(a).toPromise().then(resp => {
            return resp.content;
          }, err => {
            console.log(err);
          });
        }
      }
    });

    /* get sim by id fix */
    this.searchSimById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          this.simTab = false;
          a = loadOptions.filter[2];
          return service.getSimById(a).toPromise().then(resp => {
            return resp.content;
          }, err => {
            console.log(err);
          });
        }
      }
    });

  }

  getIdLoc(locationCode) {
    this.resetBtn();
    this.clearLocation();
    // this.clearMeter();
    // this.clearCommunicationDevice();
    // this.clearSimCard();
    this.locationPopup = false;

    this.service.getDataAMRByLoc(locationCode)
      .subscribe(
        resp => {
          // fill tab Location
          this.location = resp.location;
          this.search.location = this.location.locationCode + ' - ' + this.location.locationName;
          this.search.locationCode = this.location.locationCode;


          if (this.location.status === 'STOCK') {
            this.btnMeter = false;
            this.btnCommDevice = false;
            this.locationTab = false;
            this.meterTab = true;
            this.commDeviceTab = true;
            this.simTab = true;
          } else {
            this.dataAMRId = resp.id;
            this.meterTab = false;
            this.commDeviceTab = false;
            this.simTab = false;
            this.btnMeter = true;
            this.btnCommDevice = true;
            this.btnSim = true;
            this.btnDeactive = true;

            this.assetMeter = resp.assetMeter;
            this.assetCommDevice = resp.assetCommunication;

            // tslint:disable-next-line:max-line-length
            this.search.Meter = this.assetMeter.assetCode + ' - ' + this.assetMeter.brandName + ' ' + this.assetMeter.brandTypeName;
            this.search.MeterCode = this.assetMeter.assetCode;

            // tslint:disable-next-line:max-line-length
            this.search.commDevice = this.assetCommDevice.assetCode + ' - ' + this.assetCommDevice.brandName + ' ' + this.assetCommDevice.brandTypeName;
            this.search.commDeviceCode = this.assetCommDevice.assetCode;

            if (this.assetCommDevice.assetTypeName === 'MODEM') {
              // fill tab Sim Card
              this.assetSim = resp.assetSim;
              this.search.simCard = this.assetSim.assetCode + ' - ' + this.assetSim.brandName;
              this.search.simCardCode = this.assetSim.assetCode;
            }
          }
          this.enableBtnTest();
        }
      )
  }

  getIdMeter(meterId) {
    this.clearMeter();
    this.meterPopup = false;
    this.service.getDetailAssetById(meterId)
      .subscribe(
        resp => {
          this.assetMeter = resp;
          this.search.Meter = this.assetMeter.assetCode + ' - ' + this.assetMeter.brandName + ' ' + this.assetMeter.brandTypeName;
          this.search.MeterCode = this.assetMeter.assetCode;
          this.enableBtnTest();
        }
      )
  }

  getIdCommDevice(assetId) {
    this.clearCommunicationDevice();
    this.commDevicePopup = false;
    this.commDeviceTab = false;
    this.service.getDetailAssetById(assetId)
      .subscribe(
        resp => {
          this.assetCommDevice = resp;
          // tslint:disable-next-line:max-line-length
          this.search.commDevice = this.assetCommDevice.assetCode + ' - ' + this.assetCommDevice.brandName + ' ' + this.assetCommDevice.brandTypeName;
          this.search.commDeviceCode = this.assetCommDevice.assetCode;
          this.enableBtnTest();
          if (this.assetCommDevice.assetTypeName === 'MODEM') {
            this.ismodem = true;
            this.btnSim = false;
            this.simTab = false;
          } else {
            this.clearSimCard();
            this.ismodem = false;
            this.btnSim = true;
            this.simTab = true;
          }
        }
      )
  }

  getIdSim(assetId) {
    this.clearSimCard();
    this.simPopup = false;
    this.service.getDetailAssetById(assetId)
      .subscribe(
        resp => {
          this.assetSim = resp;
          this.search.simCard = this.assetSim.assetCode + ' - ' + this.assetSim.brandName;
          this.search.simCardCode = this.assetSim.assetCode;
          this.enableBtnTest();
        }
      )
  }

  resetBtn() {
    this.locationTab = true;
    this.meterTab = true;
    this.commDeviceTab = true;
    this.simTab = true;
    this.btnActive = false;
    this.btnDeactive = false;
    this.btnTest = false;
    this.btnMeter = false;
    this.btnCommDevice = false;
    this.btnSim = false;
    this.testResult = false;

    this.isCancel = false;
    this.isSave = false;
    this.isActive = false;
    this.isDeactive = false;
  }

  clearLocation() {
    this.resetBtn();
    this.search.locationCode = '';
    this.search.location = '';
    delete this.location;
  }

  clearMeter() {
    this.search.MeterCode = '';
    this.search.Meter = '';
    delete this.assetMeter;
  }

  clearCommunicationDevice() {
    // fill tab Communication Device
    this.search.commDeviceCode = '';
    this.search.commDevice = '';
    delete this.assetCommDevice;
  }

  clearSimCard() {
    this.search.simCardCode = '';
    this.search.simCard = '';
    delete this.assetSim;
  }

  enableBtnTest() {
    // tslint:disable-next-line:max-line-length
    if (this.search.locationCode !== '' && this.search.MeterCode !== '' && this.search.commDeviceCode !== '' &&
      this.location.status === 'STOCK' && this.assetMeter.status === 'STOCK' && this.assetCommDevice.status === 'STOCK') {
      // tslint:disable-next-line:max-line-length
      if ((this.assetCommDevice.assetTypeName === 'MODEM' && this.search.simCardCode !== '' && this.assetSim.status === 'STOCK') || (this.assetCommDevice.assetTypeName === 'CONVERTER')) {
        this.btnTest = true;
      }
    }
  }

  testCommisioning() {
    this.confVisible = true;
    this.isSave = true;
    this.isCancel = false;
    this.isActive = false;
    this.isDeactive = false;
    // e.preventDefault();
  }

  active() {
    this.text = this.search.location;
    this.isSave = false;
    this.isCancel = false;
    this.isActive = true;
    this.isDeactive = false;
    this.confVisible = true;
    // e.preventDefault();
  }

  deactive() {
    this.text = this.search.location;
    this.confVisible = true;
    this.isSave = false;
    this.isCancel = false;
    this.isActive = false;
    this.isDeactive = true;
    // e.preventDefault();
  }

  cancel(e) {
    this.confVisible = true;
    this.isCancel = true;
    this.isSave = false;
    this.isActive = false;
    this.isDeactive = false;
    // e.preventDefault();
  }

  save() {
    this.options.message = 'Save Success';
    notify(this.options, 'success', 3000);
  }

  onHideConf() {
    this.confVisible = false;
    // this.isCancel = false;
    // this.isSave = false;
    // this.isActive = false;
    // this.isDeactive = false;
  }

  onSaveConf() { // test commisioning
    this.btnTest = false;
    if (this.location.status === 'STOCK') {
      this.showLoadPanel();
      this.testResult = true; // commisioning Result
      // this.loadingHidden();

      if (this.testResult === true) {
        this.btnActive = true;
        this.btnDeactive = false;
        this.options.message = 'Commisioning Success';
        notify(this.options, 'success', 3000);
      }
    }
  }

  onActiveConf() { // activation
    this.isActive = true;
    console.log('active : ', this.isActive);
    this.updateAssetStatus(this.assetMeter.id);
    this.updateAssetStatus(this.assetCommDevice.id);
    if (this.assetCommDevice.assetTypeName === 'MODEM') {
      this.updateAssetStatus(this.assetSim.id);
    }
    this.insertDataAMR();
  }

  onDeactiveConf() { // deactivation
    this.isActive = false;
    console.log('active : ', this.isActive);
    this.updateAssetStatus(this.assetMeter.id);
    this.updateAssetStatus(this.assetCommDevice.id);
    if (this.assetCommDevice.assetTypeName === 'MODEM') {
      this.updateAssetStatus(this.assetSim.id);
    }
    this.deleteDataAMR();
  }

  insertDataAMR() {
    this.newDataAMR.activationCode = 'Y';
    this.newDataAMR.locationCode = this.search.locationCode;
    this.newDataAMR.assetMeterCode = this.search.MeterCode;
    this.newDataAMR.assetCommunicationCode = this.search.commDeviceCode;
    this.newDataAMR.assetSimCode = this.search.simCardCode;
    this.newDataAMR.siteCode = this.location.site.siteCodeExist;
    this.service.postNewDataAMR(this.newDataAMR)
      .subscribe(
        res => {
          this.reset();
          // this.options.message = 'Activation Success';
          // notify(this.options, 'success', 3000);
          this.hide();
        }, err => {
          this.options.message = null;
          this.options.message = err.error.message;
          // notify(this.options, 'error', 3000);
        }
      )
  }

  deleteDataAMR() {
    this.service.deleteDataAMR(this.dataAMRId)
      .subscribe(
        res => {
          this.reset();
          this.options.message = 'Deactivation Success';
          notify(this.options, 'success', 3000);
          this.hide();
        }, err => {
          const msg = err.error.message;
          this.options.message = msg;
          notify(this.options, 'error', 3000);
        }
      )
  }

  updateAssetStatus(assetID: number) {
    this.updateStatusAsset.id = assetID;
    if (this.isActive === true) {
      this.updateStatusAsset.activationCode = 'Y';
      this.updateStatusAsset.status = 'ONLINE';
      this.updateStatusAsset.locationCode = this.search.locationCode;
    } else {
      this.updateStatusAsset.activationCode = 'N';
      this.updateStatusAsset.status = 'STOCK';
      this.updateStatusAsset.locationCode = '';
    }
    console.log('update :', this.updateStatusAsset);
    this.service.postStatusAsset(this.updateStatusAsset)
      .subscribe(res => {}, err => {
        this.options.message = err.error.message;
        notify(this.options, 'error', 10000);
      })
  }

  onCancelConf() {
    this.reset();
  }

  reset() {
    this.resetBtn();
    this.clearLocation();
    this.clearMeter();
    this.clearCommunicationDevice();
    this.clearSimCard();
  }

  showInfoLocation() {
    this.locationPopup = true;
  }

  showInfoMeter() {
    this.meterPopup = true;
  }

  showInfocommDevice() {
    this.commDevicePopup = true;
  }

  showInfosimCard() {
    this.simPopup = true;
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 5000);
  }

  onHidden() {
    // this.loadingVisible = false;
  }

  showLoadPanel() {
    this.loadingVisible = true;
  }

  hide() {
    this.onHide.emit();
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

  ngAfterViewInit() {
    this.myform.instance.validate()
  }
}

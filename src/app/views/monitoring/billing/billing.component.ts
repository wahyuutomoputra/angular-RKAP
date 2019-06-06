import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  BillingService
} from './billing.service';
import {
  Billing,
  Search,
  DataIndex
} from './billing.model';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';
import {
  error
} from 'selenium-webdriver';
import {
  DatePipe
} from '@angular/common';

import {
  DxDataGridComponent,
  DxContextMenuModule,
  DxPopupModule,
  DxFormModule,
  DxFormComponent,
  DxDataGridModule
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import {
  SharedModule
} from '../../shared/shared.module';
import {
  MonitoringModule
} from '../monitoring.module';
import {
  forEach
} from '@angular/router/src/utils/collection';
import * as Utils from '../../shared/_filterString_monitoring';

declare const jquery: any;
declare const $: any;
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [BillingService, ContextItemService]
})
export class BillingComponent implements AfterViewInit {
  @ViewChild(DxFormComponent) myform: DxFormComponent;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: Billing[];
  search: Search;
  contextItems: any;
  target: any;
  menuVisible = false;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  detail: any;
  detailBillings: any;
  detailBillingsGrid: any;
  detailBillingsHeader: any;
  text: any;
  progressTitle: any;
  progressContent: any;
  okButtonOptions: any = {};
  isDetail = false;
  date = new Date();

  defValue = new Date(this.date.getFullYear(), this.date.getMonth());

  /*popup*/
  sitePopup = false;
  locationPopup = false;
  assetPopup = false;

  isGetBilling = false;
  msgPopupBilling = false;
  btnDisabled = false;
  dataMeter: any[];

  /*check box mode*/
  allMode: string;
  checkBoxesMode: string;

  /*search by id*/
  searchSiteById: any;
  searchLocationById: any;
  searchAssetById: any;

  currentMode: string;
  overlappingModes: string[];
  okButtonGetData: any;

  service: any = {};

  /* disabel Calendar */
  years: any;
  months: any;
  minimums: any;
  maximums: any;

  // Searching
  filterStringParam = '';
  dataIndex = DataIndex;

  getIdSite(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCodeExist === id)[0]
    console.log(
      'e : ', e.unit
    );

    this.search.Unit = e.unit;
    this.search.Site = id;
    this.sitePopup = false;
  }

  getIdLoc(id) {
    this.search.Location = id;
    this.locationPopup = false;
  }

  showInfo() {
    this.sitePopup = true;
  }

  showInfoLocation() {
    this.locationPopup = true;
  }

  showInfoAsset() {
    this.assetPopup = true;
  }

  getIdAsset(id) {
    this.search.Asset = id;
    this.assetPopup = false;
  }

  constructor(service: BillingService,
    CIservice: ContextItemService,
    private elementRef: ElementRef) {

    /* disable calendar range 2 years */
    this.years = new Date ((this.date.getFullYear()) - 3);
    this.months = new Date (this.date.getMonth());
    this.minimums = new Date (this.years, this.months);
    this.maximums = new Date (this.date.getFullYear(), this.months);

    this.allMode = 'page';
    this.checkBoxesMode = 'onClick'
    this.service = service;
    this.contextItems = CIservice.getContextItems();
    this.search = service.getSearch();
    this.search.Year = this.defValue.toLocaleString();
    this.currentMode = service.getOverlappingModes()[1];
    this.overlappingModes = service.getOverlappingModes();

    /* site by id fix */
    this.searchSiteById = new DataSource({
      load: function (loadOptions) {
        let a: any = [];
        if (loadOptions.filter === undefined) {
           a = loadOptions.filter;
        } else {
          a = loadOptions.filter[2];
        }

        return service.getSiteByID(a).toPromise().then(resp => {
          this.dataSourceSite = resp;
          this.siteChildren = resp;
          let sites1: any;
          let sites2: any;
          let sites3: any;
          let sitess: any;
          this.siteChildren.forEach(element => {
            sites1 = element.childSite;

            if (sitess == null) {
              sitess = [{
                'siteCodeExist': element.siteCodeExist,
                'name': element.name,
                'level': element.siteType.siteLevel,
                'unit': element.unit
              }];
            }
            if (sites1.length > 0) {
              sites1.forEach(element1 => {
                if (typeof (element1.siteCodeExist) !== 'undefined') {
                  sitess.push({
                    'siteCodeExist': element1.siteCodeExist,
                    'name': element1.name,
                    'level': element1.siteType.siteLevel,
                    'unit': element1.unit
                  })
                }

                sites2 = element1.childSite;
                if (sites2.length > 0) {
                  sites2.forEach(element2 => {
                    if (typeof (element2.siteCodeExist) !== 'undefined') {
                      sitess.push({
                        'siteCodeExist': element2.siteCodeExist,
                        'name': element2.name,
                        'level': element2.siteType.siteLevel,
                        'unit': element2.unit
                      });
                    }
                    sites3 = (element2.childSite)
                  });
                }
              });
            }
          });
          this.dataSourceSite = sitess;
          return this.dataSourceSite;
        }, err => {
          console.log('Error  .... ');
          console.log(err);
        });
      }
    });

    /* get loc by id fix */
    this.searchLocationById = new DataSource({
      load: function (loadOptions) {
        let a: any = [];
        if (loadOptions.filter === undefined) {
           a = loadOptions.filter;
        } else {
          a = loadOptions.filter[2];
        }
        return service.getLocById(a).toPromise().then(resp => {
          return resp;
        }, err => {
          console.log(err);
        });
      }
    });

    /* get loc by id test */
    this.searchAssetById = new DataSource({
      load: function (loadOptions) {
        let a: any = [];
        if (loadOptions.filter === undefined) {
           a = loadOptions.filter;
        } else {
          a = loadOptions.filter[2];
        }
        return service.getAssetById(a).toPromise().then(resp => {
          return resp;
        }, err => {
          console.log(err);
        });
      }
    });
  }

  getCombinedFilter() {
    return this.dataGrid.instance.getCombinedFilter(true);
  }

  contentReady(e) {
    const ini = this;
    if (this.dataGrid.instance.getCombinedFilter() !== undefined) {
      const filterString = Utils.getFilterStringFunctionMonitoring(this.dataGrid.instance.getCombinedFilter(), this.dataIndex)
      if (this.filterStringParam === '') {
        this.filterStringParam = filterString;
        if (filterString.indexOf('\\') !== -1) {
          return;
        }
        this.filterSearch(filterString);
      } else if (this.filterStringParam === filterString) {
        return;
      } else {
        this.filterStringParam = filterString;
        if (filterString.indexOf('\\') !== -1) {
          return;
        }
        this.filterSearch(filterString);
      }
    }
  }

  filterSearch(filterString) {
    const ini = this;
    this.okButtonOptions = new DataSource({
      load: function (loadOptions) {
        return ini.service.getDataByFilter(filterString, loadOptions.skip / loadOptions.take, loadOptions.take)
          .toPromise()
          .then(
            resp => {
              return {
                data: resp,
                totalCount: resp.length
              }
            }, err => {
              console.log(err);
            }
          );
      }
    });
  }

  Submit() {
    const dataform = this.myform.instance.option('formData');
    const svc = this.service;
    this.search.Unit = '';

    console.log('log this.search .site : ', this.search.Site);
    if (this.search.Site === '' && this.search.Year !== '') {
      this.Submit2();
    } else {
      svc.getSiteByCode(this.search.Site)
        .subscribe(x => {
          // this.siteUnitFilterCode = resp;
          this.search.Unit = x[0].unit;
          console.log('this.search.Unit ===========: ', this.search.Unit);


          if (this.search.Unit == null || this.search.Unit === undefined || this.search.Unit === '') {
            notify('Data Site Not Found');
          } else {
            this.Submit2();
          }

        }, err => {
          console.log(err);
        });
    }
  }

  Submit2() {
    const svc = this.service;
    this.okButtonOptions = new DataSource({
      load: function (loadOptions) {
        return svc.save(loadOptions.skip / loadOptions.take, loadOptions.take)
          .toPromise()
          .then(resp => {
            console.log('resp billing : ', resp);

            return {
              data: resp,
              totalCount: resp.length
            };

          }, err => {
            console.log(err);
          });
      }
    });
  }


  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;

    this.detailBillings = this.okButtonOptions._items.filter(dataSource => dataSource.meterCode === event)[0]

    this.service.getAllData(this.detailBillings.locationCode)
      .subscribe(resp => {
        this.detailBillingsHeader = resp;
      }, err => {
        console.log(err);
      })

    const date = new Date(this.search.Year);
    this.service.getOne(this.detailBillings.meterCode, date.getFullYear().toString())
      .subscribe(resp => {
        this.detailBillingsGrid = resp;
      }, err => {
        console.log(err);
      })
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      console.log('text: ', this.text)
      if (this.text === 'Detail') {
        this.popupVisible = true;
        console.log('popupVisible: ', this.popupVisible)
        this.isDetail = true;
      }
    }
  }
  delete() {
    console.log('delete');
  }
  cancel() {
    console.log('cancel');
  }

  onHideBilling() {
    this.popupVisible = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  onHideConf() {
    this.confVisible = false;
  }

  back() {
    this.isDetail = false;
  }

  selectionChangedHandler(value) {
    const datax: any = [];

    let datainstance;

    datainstance = this.dataGrid.instance.getSelectedRowsData();
    for (let i = 0; i < datainstance.length; i++) {
      datax.push(datainstance[i].meterCode);
    }
    this.dataMeter = datax;

    // enable button
    if (this.dataMeter.length === 0) {
      $('#getData').dxButton({
        disabled: true
      });
    } else {
      $('#getData').dxButton({
        disabled: false
      });
    }


  }

  buttonGetDataBillings(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      disabled: this.btnDisabled,
      options: {
        hint: 'Click to Get data',
        icon: 'refresh',
        text: 'Get Data',
        onClick: function () {
          ini.isGetBilling = true;
          ini.msgPopupBilling = ini.isGetBilling;
        }
      }
    });
  }

  getDataBilling() {
    this.msgPopupBilling = false;
    console.log(this.dataMeter);
    if (this.dataMeter === undefined || this.dataMeter.length < 1) {
      notify({
        closeOnClick: true,
        displayTime: 3000,
        message: 'No Data Meter Selected !'
      }, 'error');
    } else {
    this.service.getDataBillings(this.dataMeter)
      .subscribe(resp => {
        this.okButtonGetData = resp;
        console.log('this.okButtonGetData : ', this.okButtonGetData);
      }, err => {
        console.log(err);
      })
    }
  }

  // buttonGetDataBilling() {
  //   const a = this;
  //   const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];

  //   // center after(right)
  //   const $customButton = $('<div id="getData">').dxButton({
  //     icon: 'refresh',
  //     text: 'Get Data',
  //     onClick: function () {
  //       a.isGetBilling = true;
  //       a.msgPopupBilling = true;
  //       console.log('data meter : ', a.dataMeter);
  //     }
  //   });

  //   d1.append($customButton[0]);
  // }

  close() {
    this.msgPopupBilling = false;
  }

  ngAfterViewInit() {
    this.myform.instance.validate()
    // this.buttonGetDataBilling();

    // $('#getData').dxButton({
    //   disabled: true
    // }); // disable button
  }
}

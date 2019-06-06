import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {
  InstantService,
  Event,
  Search,
  Location,
  Data2,
  FilterOperator,
  DataIndex
} from './instant.service';
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
  DxContextMenuModule,
  DxPopupModule,
  DxFormModule,
  DxFormComponent,
  DxDataGridModule,
  /* auto complete */
  DxAutocompleteModule,
  DxTemplateModule,
  DxDataGridComponent
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
import {
  OnInit
} from '@angular/core/src/metadata/lifecycle_hooks';

declare const jquery: any;
declare const $: any;
@Component({
  selector: 'app-instant',
  templateUrl: './instant.component.html',
  styleUrls: ['./instant.component.css'],
  providers: [InstantService, ContextItemService]
})
export class InstantComponent implements AfterViewInit {
  @ViewChild(DxFormComponent) myform: DxFormComponent;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource: Event[];
  search: Search;
  contextItems: any;
  target: any;
  menuVisible = false;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  detailInstants: any;
  detailInstantsHeader: any;
  detailInstantsPopup: any;
  date = new Date();
  isGetInstant = false;
  btnDisabled = false;

  defValue = new Date(this.date.getFullYear(), this.date.getMonth());
  text: any;
  progressTitle: any;
  progressContent: any;

  /*search by id*/
  searchSiteById: any;
  searchLocationById: any;
  searchAssetById: any;

  /* search */
  // sites2: Site2[]; //o
  locations: Location[];

  /*popup*/
  sitePopup = false;
  locationPopup = false;
  assetPopup = false;
  msgPopupInstant = false;
  siteSearchVsb = false;
  selectedRows: number[];
  dataMeter: any[];
  okButtonGetData: any;

  /*check box mode*/
  allMode: string;
  checkBoxesMode: string;

  dataSourceSite: any = {};
  dataSourceGet: any = {};
  okButtonOptions: any = {};
  detailEventById: any = {};
  // service: any={};
  isDetail = false;
  isShowInfo = false;

  /* disable Calendar */
  years: any;
  months: any;
  minimums: any;
  maximums: any;

  /* combine filter */
  combinedFilter: any;
  filterStringParam = '';
  filterOperator = FilterOperator;
  dataIndex = DataIndex;

  getIdSite(id) {
    this.search.Site = id;
    this.sitePopup = false;
  }

  getIdLoc(id) {
    this.search.Location = id;
    this.locationPopup = false;
  }

  getIdAsset(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCodeExist === id)[0]

    this.search.Unit = e.unit;
    this.search.Asset = id;
    this.assetPopup = false;
  }

  showInfo() {
    // this.sitePopup = true;
    this.isShowInfo = true;
    this.siteSearchVsb = true;
  }

  showInfoLocation() {
    this.locationPopup = true;
  }

  showInfoAsset() {
    this.assetPopup = true;
  }

  searchSite(data) {
    this.searchSiteById.load(data);
  }

  searchLocation(data) {
    this.searchLocationById.load(data);
  }

  searchAsset(data) {
    this.searchAssetById.load(data);
  }


  constructor(private service: InstantService, CIservice: ContextItemService, private elementRef: ElementRef) {

    /* disable calendar reange 2 years */
    this.years = new Date((this.date.getFullYear()) - 2);
    this.months = new Date(this.date.getMonth());
    this.minimums = new Date(this.years, this.months).toLocaleDateString();
    this.maximums = new Date(this.date.getFullYear(), this.months).toLocaleDateString();

    this.allMode = 'page';
    this.checkBoxesMode = 'onClick'
    this.search = this.service.getSearch();
    this.search.MonthPeriode = this.defValue.toLocaleString();
    // this.dataSource = service.getEvents();
    this.contextItems = CIservice.getContextItems();


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
  valueChange(e) {
    console.log('MonthPeriode: ', this.search.MonthPeriode);
  }
  Submit() {
    const dataform = this.myform.instance.option('formData');
    const svc = this.service;
    this.search.Unit = '';

    if (this.search.Site === '' && this.search.MonthPeriode !== '') {
      this.Submit2();
    } else {
      svc.getSiteByCode(this.search.Site)
        .subscribe(x => {
          this.search.Unit = x[0].unit;

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
        return svc.save()
          .toPromise()
          .then(resp => {
            if (resp.length === 0) {
              notify({
                closeOnClick: true,
                displayTime: 3000,
                message: 'No Data Found'
              }, 'error');
            }
            console.log('resp : ', resp);
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
    this.detailInstants = this.okButtonOptions._items.filter(dataSource => dataSource.locationCode === event)[0]
  }

  itemClick(e) {

    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Detail') {
        this.popupVisible = true;
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

  onHideInstant() {
    this.popupVisible = false;
  }
  onHideSiteSearch(event, event2) {

    this.search.Unit = event.event2;
    this.search.Site = event.event;

    this.isShowInfo = false;
    this.siteSearchVsb = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  back() {
    // this.popupVisible = false;
    this.isDetail = false;
    // this.buttonGetDataInstant();
  }

  ngAfterViewInit() {
    this.myform.instance.validate();
    // this.buttonGetDataInstant();

    // $('#getData').dxButton({
    //   disabled: true
    // }); // disable button
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
              console.log('resp: ', resp);
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
      this.btnDisabled = true;
      // $('#getData').dxButton({
      //   disabled: true
      // });
    } else {
      this.btnDisabled = true;
      // $('#getData').dxButton({
      //   disabled: false
      // });
    }
  }

  buttonGetDataInstants(e) {
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
          ini.isGetInstant = true;
          ini.msgPopupInstant = ini.isGetInstant;
        }
      }
    });
  }

  getDataInstant() {
    this.msgPopupInstant = false;
    if (this.dataMeter === undefined || this.dataMeter.length < 1) {
      notify({
        closeOnClick: true,
        displayTime: 3000,
        message: 'No Data Meter Selected !'
      }, 'error');
    } else {
    this.service.getDataInstants(this.dataMeter)
      .subscribe(resp => {
        this.okButtonGetData = resp;
        console.log('this.okButtonGetData : ', this.okButtonGetData);
      }, err => {
        console.log(err);
      })
    }
  }

  // buttonGetDataInstant() {

  //   const a = this;
  //   const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];

  //   // center after(right)
  //   const $customButton = $('<div id="getData">').dxButton({
  //     icon: 'refresh',
  //     text: 'Get Data',
  //     onClick: function () {
  //       a.isGetInstant = true;
  //       a.msgPopupInstant = true;
  //       console.log('data meter : ', a.dataMeter);
  //     }
  //   });

  //   d1.append($customButton[0]);
  // }

}

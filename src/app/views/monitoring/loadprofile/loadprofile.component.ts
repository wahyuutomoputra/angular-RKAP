import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  MonLoadprofileService,
  Loadprofile,
  Task,
  Location,
  ArchitectureInfo,
  Search,
  FilterOperator,
  DataIndex
} from './loadprofile.service';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';
import {
  error
} from 'selenium-webdriver';
import notify from 'devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';
import {
  DatePipe
} from '@angular/common';
import {
  DxDataGridComponent,
  DxContextMenuModule,
  DxPopupModule,
  DxTextAreaModule,
  DxFormModule,
  DxFormComponent,
  DxDateBoxModule,
  DxChartModule,
  DxScrollViewComponent,
  DxScrollViewModule
} from 'devextreme-angular';

import {
  SharedModule
} from '../../shared/shared.module';
import {
  MonitoringModule
} from '../monitoring.module';
// import {
//   filter
// } from 'rxjs/operator/filter';
import * as Utils from '../../shared/_filterString';

declare const jquery: any;
declare const $: any;
@Component({
  selector: 'app-monitoringloadprofile',
  templateUrl: './loadprofile.component.html',
  styleUrls: ['./loadprofile.component.css'],
  providers: [MonLoadprofileService, ContextItemService]
})

export class LoadprofileComponent implements AfterViewInit, OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxFormComponent) myform: DxFormComponent;
  @ViewChild(DxScrollViewComponent) scrollView: DxScrollViewComponent;
  dataSource: Loadprofile[];
  dataGridInstance: any;
  search: Search;
  contextItems: any;
  popupVisible = false;
  detailLoadprofile: any;
  detailLoadprofileGrid: any;
  detailDataLocationCode: any;
  text: any;
  rules: Object;
  target: any;
  menuVisible = false;
  employees: Task[];
  locations: Location[];
  dataSources: any;
  date = new Date();
  isGet = false;
  defValue = new Date(this.date.getFullYear(), this.date.getMonth());

  isDetail = false;
  isShowInfo = false;

  detailGp: Loadprofile[];

  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  currentMode: string;
  overlappingModes: string[];

  /* button */
  okButtonOptions: any;

  okButtonGetData: any;

  /*graph*/
  architecturesInfo: ArchitectureInfo[];

  /*popup*/
  sitePopup = false;
  locationPopup = false;
  assetPopup = false;
  msgPopup = false;
  selectedRows: number[];
  dataMeter: any[];
  siteSearchVsb = false;

  /*check box mode*/
  allMode: string;
  checkBoxesMode: string;

  /*search by id*/
  searchSiteById: any;
  searchLocationById: any;
  searchAssetById: any;
  test2: any;

  service: any = {};

  /* disabel Calendar */
  years: any;
  months: any;
  minimums: any;
  maximums: any;

  /* combine filter */
  combinedFilter: any;
  filterStringParam = '';
  filterOperator = FilterOperator;
  gridDataSource: any = {};
  dataIndex = DataIndex;
  btnDisabled = false;

  getIdLoc(id) {
    this.search.Location = id;
    this.locationPopup = false;
  }

  showInfo() {
    this.isShowInfo = true;
    this.siteSearchVsb = true;
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
  ngOnInit() {
    // ..
  }

  constructor(service: MonLoadprofileService,
    CIservice: ContextItemService,
    private elementRef: ElementRef) {
    /* disable calendar reange 2 years */
    this.years = new Date((this.date.getFullYear()) - 2);
    this.months = new Date(this.date.getMonth());
    this.minimums = new Date(this.years, this.months);
    this.maximums = new Date(this.date.getFullYear(), this.months);
    /* check box select per page */
    this.allMode = 'page';
    this.checkBoxesMode = 'onClick'

    this.currentMode = service.getOverlappingModes()[0];
    this.overlappingModes = service.getOverlappingModes();

    this.search = service.getSearch();
    this.search.MonthPeriode = this.defValue.toLocaleString();
    this.rules = {
      'X': /[02-9]/
    };
    this.service = service;
    this.contextItems = CIservice.getContextItems();

    /* get loc by id fix */
    this.searchLocationById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          a = loadOptions.filter[2];
          return service.getLocById(a).toPromise().then(resp => {
            return resp;
          }, err => {
            console.log(err);
          });
        }
      }
    });

    /* get loc by id test */
    this.searchAssetById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {

          let a: any = [];
          a = loadOptions.filter[2];
          console.log('a asset : ', a);
          return service.getAssetById(a).toPromise().then(resp => {
            console.log('resp this asset : ', resp);
            return resp;
          }, err => {
            console.log(err);
          });
        }
      }
    });
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
          this.search.Unit = x.content[0].unit;
          if (this.search.Unit === null || this.search.Unit === undefined || this.search.Unit === '') {
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
    this.detailLoadprofile = this.okButtonOptions._items.filter(dataSource => dataSource.locationCode === event)[0]
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      console.log(this.text);
      if (this.text === 'Detail') {
        this.popupVisible = true;
        this.isDetail = true;
      }
    }
  }

  onHideLoadprofile() {
    this.popupVisible = false;
  }

  onHideSiteSearch(event) {
    if (event.event) {
      // this.search.Id = event.event.id;
      this.search.Site = event.event.siteCodeExist;
    }

    this.isShowInfo = false;
    this.siteSearchVsb = false;
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

  close() {
    this.msgPopup = false;
  }

  getCombinedFilter() {
    console.log('getCombinedFilter');
    return this.dataGrid.instance.getCombinedFilter(true);
  }
  ngAfterViewInit() {
    this.myform.instance.validate();
    this.isGet = false;
    this.isShowInfo = false;
    this.dataGridInstance = this.dataGrid.instance;
    console.log('ini.dataGrid ng after view : ', this.dataGrid.instance);
  }

  contentReady(e) {
    // console.log('e', e.component.getCombinedFilter(true));
    console.log('ini., : ', this.dataGrid);
    const ini = this;
    if (e.component.getCombinedFilter() !== undefined) {
      const filterString = Utils.getFilterStringFunction(e.component.getCombinedFilter(), this.dataIndex)
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
    this.gridDataSource = new DataSource({
      load: function (loadOptions) {
        return ini.service.getDataByFilter(filterString, loadOptions.skip / loadOptions.take, loadOptions.take)
          .toPromise()
          .then(
            resp => {
              return {
                data: resp.content,
                totalCount: resp.totalElements
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
    if (this.dataMeter.length < 1) {
      this.btnDisabled = true;
      console.log('this.dataMeter.length disabled : ', this.dataMeter.length);
      console.log('btn disable disabled : ', this.btnDisabled);
    } else {
      this.btnDisabled = false;
      console.log('this.dataMeter.length enable : ', this.dataMeter.length);
      console.log('btn disable enable : ', this.btnDisabled);
    }
  }

  buttonGetDataLp(e) {
    const ini = this;
    console.log('button zzzzzzzzzzzzz: ', ini.btnDisabled);
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      disabled: ini.btnDisabled,
      options: {
        hint: 'Click to Get data',
        icon: 'refresh',
        text: 'Get Data',
        onClick: function () {
          ini.isGet = true;
          ini.msgPopup = ini.isGet;
        }
      }
    });
  }

  getDataLp() {
    this.msgPopup = false;
    console.log(this.dataMeter);
    if (this.dataMeter === undefined || this.dataMeter.length < 1) {
      notify({
        closeOnClick: true,
        displayTime: 3000,
        message: 'No Data Meter Selected !'
      }, 'error');
    } else {
    this.service.getDataLoadprofile(this.dataMeter)
      .subscribe(resp => {
        this.okButtonGetData = resp;
        console.log('this.okButtonGetData : ', this.okButtonGetData);
      }, err => {
        console.log(err);
      })
    console.log('data meter ok : , ', this.dataMeter);
  }
}
}

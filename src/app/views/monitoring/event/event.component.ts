import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { EventService} from './event.service';
import { ContextItemService, ContextItem } from './_contextItems';
import { error } from 'selenium-webdriver';
import { DatePipe } from '@angular/common';
import { Event, Search, Location, Data2, DataIndex } from './event.model';
import * as Utils from '../../shared/_filterString_monitoring';
import {
  DxContextMenuModule,
  DxPopupModule,
  DxFormModule,
  DxDataGridComponent,
  DxFormComponent,
  DxDataGridModule,
  /* auto complete */
  DxAutocompleteModule,
  DxTemplateModule
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import { SharedModule } from '../../shared/shared.module';
import { MonitoringModule } from '../monitoring.module';
import { forEach } from '@angular/router/src/utils/collection';

declare const jquery: any;
declare const $: any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [EventService, ContextItemService]
})
export class EventComponent implements AfterViewInit {
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
  detailEvents: any;
  detailEventss: any;
  detailEventsHeader: any;
  text: any;
  progressTitle: any;
  progressContent: any;
  date = new Date();
  filterStringParam = '';
  defValue = new Date(this.date.getFullYear(), this.date.getMonth());

  isDetail = false;
  isGetEvent = false;
  btnDisabled = false;
  okButtonGetData: any;

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
  msgPopupEvent = false;
  selectedRows: number[];
  dataMeter: any[];

  /*check box mode*/
  allMode: string;
  checkBoxesMode: string;
  dataIndex = DataIndex;
  dataSourceSite: any = {};
  dataSourceGet: any = {};
  okButtonOptions: any= {};
  detailEventById: any= {};
  service: any= {};

   /* disabel Calendar */
   years: any;
   months: any;
   minimums: any;
   maximums: any;

  getIdSite(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCodeExist === id)[0]

    this.search.Unit = e.unit;
    this.search.Site = id;
    this.sitePopup = false;
  }

  getIdLoc(id) {
    this.search.Location = id;
    this.locationPopup = false;
  }

  getIdAsset(id) {
    this.search.Asset = id;
    this.assetPopup = false;
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

  searchSite(data) {
    this.searchSiteById.load(data);
  }

  searchLocation(data) {
    this.searchLocationById.load(data);
  }

  searchAsset(data) {
    this.searchAssetById.load(data);
  }


  constructor(service: EventService,
  CIservice: ContextItemService,
  private elementRef: ElementRef  ) {

  /* disable calendar reange 2 years */
  this.years = new Date ((this.date.getFullYear()) - 2);
  this.months = new Date (this.date.getMonth());
  this.minimums = new Date (this.years, this.months);
  this.maximums = new Date (this.date.getFullYear(), this.months);

    /* check box select per page */
    this.allMode = 'page';
    this.checkBoxesMode = 'onClick'
    this.service = service;
    this.search = service.getSearch();
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
    this.detailEvents = this.okButtonOptions._items.filter(dataSource => dataSource.meterCode === event)[0]
    // console.log(this.detailEvents);
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
  delete() {
    console.log('delete');
  }
  cancel() {
    console.log('cancel');
  }

  onHideEvent() {
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

  close() {
    this.msgPopupEvent = false;
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
      // this.btnDisabled = true;
      $('#btnGetData').dxButton({disabled: true});
    } else {
      // this.btnDisabled = false;
      $('#btnGetData').dxButton({disabled: false});
    }
  }

  buttonGetDataEvents(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      disabled: ini.btnDisabled,
      options: {
        hint: 'Click to Get data',
        icon: 'refresh',
        text: 'Get Data',
        // elementAttr: {
        //   id: 'btnGetData'
        onClick: function () {
          ini.isGetEvent = true;
          ini.msgPopupEvent = ini.isGetEvent;
        }
      }
    });
  }

  getDataEvent() {
    this.msgPopupEvent = false;
    console.log(this.dataMeter);
    if (this.dataMeter === undefined || this.dataMeter.length < 1) {
      notify({
        closeOnClick: true,
        displayTime: 3000,
        message: 'No Data Meter Selected !'
      }, 'error');
    } else {
    this.service.getDataEvents(this.dataMeter)
      .subscribe(resp => {
        this.okButtonGetData = resp;
        console.log('this.okButtonGetData : ', this.okButtonGetData);
      }, err => {
        console.log(err);
      })
    }
  }

  // buttonGetDataEvent() {

  //   const a = this;
  //   const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];

  //   // center after(right)
  //   const $customButton = $('<div id="getData">').dxButton({
  //     icon: 'refresh',
  //     text: 'Get Data',
  //     onClick: function () {
  //       a.isGetEvent = true;
  //       a.msgPopupEvent = true;
  //       console.log('data meter : ', a.dataMeter);
  //     }
  //   });

  //   d1.append($customButton[0]);
  // }

  ngAfterViewInit() {
    this.myform.instance.validate();
    // this.buttonGetDataEvent();

    // $('#getData').dxButton({disabled: true});  // disable button
  }
}

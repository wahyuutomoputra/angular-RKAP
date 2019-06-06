import {
  Component,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  LocationService
} from './location.service';
import {
  SiteService
} from '../master/site/site.service';

import {
  error
} from 'selenium-webdriver';
import {
  Location,
  LocationType,
  Search,
  DataIndex
} from './location.model';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';
import notify from 'devextreme/ui/notify';
import {
  Router
} from '@angular/router';
import {
  DetailComponent
} from './detail/detail.component';
import {
  AddLocationComponent
} from './add/add.component';

import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import {
  importExpr
} from '@angular/compiler/src/output/output_ast';

import {
  DetailLoadProfileComponent
} from '../monitoring/loadprofile/detail/_loadprofile';
import * as Utils from '../shared/_filterString';

declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [LocationService, SiteService, ContextItemService]
})
export class LocationComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  contextItems: any;
  target: any;
  addVisible = false;
  menuVisible = false;
  isDetail = false;
  detail: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  isShowInfo = false;
  siteSearchVsb = false;
  filterStringParam = '';
  dataIndex = DataIndex;

  gridDataSource: any = {};
  locCode: any;
  locations: any[];
  locationTypes: LocationType[];
  sites: any[];
  search: Search;
  isAdv = false;
  isAdd = false;
  chevron = 'chevrondown';

  constructor(
    @Inject(LocationService) private service: LocationService,
    @Inject(SiteService) private siteService: SiteService,
    private CIService: ContextItemService,
    private router: Router,
    private elementRef: ElementRef
  ) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const ini = this;
    this.search = {
      SiteCodeExist: currentUser.siteCodeExist,
      Id: ''
    };
    this.contextItems = CIService.getContextItems();

    // this.gridDataSource = new DataSource({
    //   load: function (loadOptions) {
    //     console.log('loadOptions: ', loadOptions);
    //     return ini.service.getAll(loadOptions.skip, loadOptions.take)
    //       .toPromise()
    //       .then(
    //         resp => {
    //           return {
    //             data: resp.content,
    //             totalCount: resp.totalElements
    //           }
    //         }
    //       );
    //   }
    // });

    this.service.getAllType()
      .subscribe(
        resp => {
          this.locationTypes = resp;
        }, err => {
          console.log(err);
        }
      );

    this.siteService.getAllExport()
      .subscribe(
        resp => {
          this.sites = resp;
        }, err => {
          console.log(err);
        }
      );
  }

  addNewButton(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        hint: 'Click to Add',
        icon: 'add',
        text: 'Add New Location',
        onClick:  function () {
          ini.isAdd = true;
          ini.addVisible = ini.isAdd;
        }
      }
    });
  }

  contentReady(e) {
    const ini = this;
    if (this.dataGrid.instance.getCombinedFilter() !== undefined) {
      const filterString = Utils.getFilterStringFunction(this.dataGrid.instance.getCombinedFilter(), this.dataIndex)
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

  doSearch() {
    const ini = this;
    this.gridDataSource = new DataSource({
      load: function (loadOptions) {
        return ini.service.getDataBySiteCode(ini.search.SiteCodeExist, loadOptions.skip, loadOptions.take)
          .toPromise()
          .then(
            resp => {
              return {
                data: resp.content,
                totalCount: resp.totalElements
              }
            }
          );
      }
    });
  }
  keyPressed(e) {
    console.log('e:', e);

    // if (e.key === 'Enter') {
    //   this.searching();
    // }
  }
  showAdvSearch() {
    this.isAdv = !this.isAdv;
    if (this.isAdv) {
      this.chevron = 'chevronup';
    } else {
      this.chevron = 'chevrondown';
    }

  }
  advSearch() {}
  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    this.detail = this.gridDataSource._items.filter(dataSource => dataSource.id === event)[0];
  }

  showInfo() {
    this.isShowInfo = true;
    this.siteSearchVsb = true;
  }

  onHideSiteSearch(event) {
    if (event.event) {
      this.search.Id = event.event.id;
      this.search.SiteCodeExist = event.event.siteCodeExist;
    }

    this.isShowInfo = false;
    this.siteSearchVsb = false;
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Detail') {
        this.popupVisible = true;
        this.locCode = this.detail.locationCode;
        this.isDetail = true;
      } else if (this.text === 'Activate') {
        notify({
          closeOnClick: true,
          displayTime: 50000,
          message: 'The ' + this.text + ' item was clicked'
        }, 'success');
      } else if (this.text === 'Deactivate') {
        notify('The ' + this.text + ' item was clicked', 'info', 1500);
        this.confVisible = true;
      } else if (this.text === 'Ping! Modem') {
        notify('The ' + this.text + ' item was clicked', 'error', 1500);
        this.progressVisible = true;
        this.progressTitle = this.text;
        const titles = this.progressTitle.split(' ');
        this.progressContent = 'Sending ' + titles[0] + ' command to ' + titles[1] + ' ' + this.detail.tikurId;
      } else if (this.text === 'Ping! Meter') {
        notify('The ' + this.text + ' item was clicked', 'warning', 1500);
        this.progressVisible = true;
        this.progressTitle = this.text;
        const titles = this.progressTitle.split(' ');
        this.progressContent = 'Sending ' + titles[0] + ' command to ' + titles[1] + ' ' + this.detail.tikurId;
      }
    }
  }
  click() {}
  back() {
    this.isDetail = false;
  }

  onHidePopup() {
    this.popupVisible = false;
  }

  onHideConf() {
    this.confVisible = false;
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  onHideAdd() {
    this.addVisible = false;
    this.isAdd = false;
  }
}

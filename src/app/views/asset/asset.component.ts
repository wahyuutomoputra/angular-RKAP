import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  error
} from 'selenium-webdriver';
import 'rxjs/add/operator/toPromise';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {
  AssetService,
  Search
} from './asset.service';
import {
  Asset,
  AssetType,
  FilterOperator,
  DataIndex
} from './asset.model';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';

import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxSelectBoxComponent
} from 'devextreme-angular';
import {
  AssetEditComponent
} from './edit/asset-edit.component';
import * as Utils from '../shared/_filterString';
import {
  SiteSearchService
} from '../shared/_siteSearch.service';

@Component({
  selector: 'app-site',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css'],
  providers: [AssetService, ContextItemService, SiteSearchService]
})
export class AssetComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxSelectBoxComponent) selectBox: DxSelectBoxComponent;

  dataTypes: AssetType[];
  gridDataSource: any = {};
  contextItems: any;
  target: any;
  detail: any;
  text: any;
  menuVisible = false;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  isShowInfo = false;
  siteSearchVsb = false;
  progressTitle: any;
  progressContent: any;
  isDetail = false;
  assetDetail: any;
  asset: any[];
  search: Search;
  isAdd = false;
  addVisible = false;
  editId = null;
  combinedFilter: any;
  filterStringParam = '';
  filterOperator = FilterOperator;
  dataIndex = DataIndex;
  options = {
    message: '',
    closeOnOutsideClick: true,
    closeOnClick: true,
    closeOnSwipe: true,
    closeOnBackButton: true,
  }
  menuChecklist = ['Change Site'];

  userSites: any[] = [];
  changeSiteCode: any = '';

  batchAction = this.menuChecklist[0];

  lastLimit = 10;

  confChangeSite = false;
  siteNameChange = '';

  constructor(
    private service: AssetService,
    private CIService: ContextItemService,
    private router: Router,
    private elementRef: ElementRef,
    private siteSearchService: SiteSearchService
  ) {
    this.contextItems = CIService.getContextItems();
    this.search = this.service.getSearch();

    this.service.getAllUserSite().subscribe(resp => {
      resp.forEach(level1 => {
        const siteLevel = Number(level1.siteType.siteLevel);
        let level = Number(level1.siteType.siteLevel);
        if (siteLevel > 1) {
          this.service.getSiteBySiteCode(level1.siteCode).subscribe(site => {
            let parent = site[0].parentSite;

            this.service.getSiteBySiteCode(parent).subscribe(siteParent1 => {
              level--;
              parent = siteParent1[0].parentSite;
              this.userSites.push({
                'siteCodeExist': siteParent1[0].siteCodeExist,
                'name': siteParent1[0].name
              })

              if (level > 1) {
                this.service.getSiteBySiteCode(parent).subscribe(siteParent2 => {
                  level--;
                  parent = siteParent2[0].parentSite;
                  this.userSites.push({
                    'siteCodeExist': siteParent2[0].siteCodeExist,
                    'name': siteParent2[0].name
                  })

                  if (level > 1) {
                    this.service.getSiteBySiteCode(parent).subscribe(siteParent3 => {
                      level--;
                      parent = siteParent3[0].parentSite;
                      this.userSites.push({
                        'siteCodeExist': siteParent3[0].siteCodeExist,
                        'name': siteParent3[0].name
                      })

                      if (level > 1) {
                        this.service.getSiteBySiteCode(parent).subscribe(siteParent4 => {
                          level--;
                          parent = siteParent4[0].parentSite;
                          this.userSites.push({
                            'siteCodeExist': siteParent4[0].siteCodeExist,
                            'name': siteParent4[0].name
                          })
                        })
                      }
                    })
                  }
                })
              }
            })
          })
        }

        this.userSites.push({
          'siteCodeExist': level1.siteCodeExist,
          'name': level1.name
        })

        if (level1.childSite.length > 0) {
          level1.childSite.forEach(level2 => {
            this.userSites.push({
              'siteCodeExist': level2.siteCodeExist,
              'name': level2.name
            })

            if (level2.childSite.length > 0) {
              level2.childSite.forEach(level3 => {
                this.userSites.push({
                  'siteCodeExist': level3.siteCodeExist,
                  'name': level3.name
                })

                if (level3.childSite.length > 0) {
                  level3.childSite.forEach(level4 => {
                    this.userSites.push({
                      'siteCodeExist': level4.siteCodeExist,
                      'name': level4.name
                    })

                    if (level4.childSite.length > 0) {
                      level4.childSite.forEach(level5 => {
                        this.userSites.push({
                          'siteCodeExist': level5.siteCodeExist,
                          'name': level5.name
                        })
                      })
                    }
                  })
                }
              })
            }
          })
        }
      });
    })
  }
  getCombinedFilter() {
    console.log('getCombinedFilter');
    return this.dataGrid.instance.getCombinedFilter(true);
  }
  ngAfterViewInit() {}
  addNewButton(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        hint: 'Click to Add',
        icon: 'add',
        text: 'Add New Asset',
        onClick: function () {
          ini.isAdd = true;
          ini.addVisible = ini.isAdd;
          ini.editId = null;
        }
      }
    });
  }
  contentReady(e) {
    const ini = this;
    if (this.dataGrid.instance.getCombinedFilter() !== undefined) {
      // search via grid
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
    } else {
      // search via site search box
      if (ini.search.SiteCodeExist.length > 0) {
        const filterString = 'siteCodeExist:' + ini.search.SiteCodeExist;
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
  }
  filterSearch(filterString) {
    const ini = this;
    this.gridDataSource = new DataSource({
      load: function (loadOptions) {

        // menampilkan export
        let page = 0, limit = 0;
        if (typeof loadOptions.skip !== 'undefined') {
          page = loadOptions.skip / loadOptions.take;
          limit = Number(loadOptions.take);

          this.lastLimit = limit;
        } else {
          limit = this.lastLimit;
        }

        return ini.service.getDataByFilter(filterString, page, limit)
          .toPromise()
          .then(
            resp => {
              this.lastLimit = resp.totalElements;
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
  exporting(e) {
    // console.log(e);
  }
  showMenu(event): void {
    this.target = event;
    this.service.getOne(this.target)
      .subscribe(resp => {
        this.detail = resp;

        if (this.detail.status === 'STOCK') {
          this.contextItems[1].disabled = false;
          this.contextItems[2].disabled = false;
          this.contextItems[3].text = 'Activation';
        } else {
          this.contextItems[1].disabled = true;
          this.contextItems[2].disabled = true;
          this.contextItems[3].text = 'Deactivation';
        }

        if (this.detail.assetTypeName === 'METER') {
          this.contextItems[4].visible = true;
          this.contextItems[5].visible = true;
          this.contextItems[6].visible = true;
        } else {
          this.contextItems[4].visible = false;
          this.contextItems[5].visible = false;
          this.contextItems[6].visible = false;
        }

        this.menuVisible = true;
      }, err => {
        console.log(err);
      })
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Detail') {
        this.popupVisible = true;
        this.isDetail = true;
      } else if (this.text === 'Edit') {
        if (this.detail.status !== 'STOCK') {
          this.options.message = 'Cannot Edit Asset with status doesn\'t equal STOCK !'
          notify(this.options, 'warning', 3000);
          return
        }
        this.editId = this.target;
        this.isAdd = true;
        this.addVisible = this.isAdd;
      } else if (this.text === 'Delete') {
        notify('The ' + this.text + ' item was clicked', 'info', 1500);
        this.confVisible = true;
      } else if (this.text === 'Activation' || this.text === 'Deactivation') {
        console.log(this.detail);
        localStorage.setItem('assetDetail', JSON.stringify(this.detail));
        window.open('/#/commisioning');
      }
    }
  }
  onHideMenu() {
    this.menuVisible = false;
  }
  onHideDetail() {
    this.popupVisible = false;
  }

  updateSite() {}

  onValueChanged(e) {
    this.changeSiteCode = e.value;
    // console.log(e);
    this.siteNameChange = this.userSites.find(value => value.siteCodeExist === e.value).name;
  }

  changeSite() {
    this.confChangeSite = true;
  }

  onChangeSite() {
    const data = this.dataGrid.instance.getSelectedRowKeys();
    const checkSimilar = data.filter(value => value.siteCodeExist !== data[0].siteCodeExist);
    const checkStock = data.filter(value => value.status !== 'STOCK');
    if (checkSimilar.length > 0) {
      this.options.message = 'Action DENIED, selected sites must be the same';
      notify(this.options, 'error', 3000);
      this.confChangeSite = false;
      return false;
    }
    if (checkStock.length > 0) {
      this.options.message = 'Action DENIED, some selected sites are not on stock';
      notify(this.options, 'error', 3000);
      this.confChangeSite = false;
      return false;
    }

    data.forEach(value => {
      this.service.getOne(value.id)
        .subscribe(resp => {

          resp.siteCodeExist = this.changeSiteCode;
          this.siteSearchService.getSiteByID(resp.siteCodeExist)
            .subscribe(
              site => {
                if (site.length === 0) {
                  this.options.message = 'Site doesn`t exist';
                  notify(this.options, 'error', 3000);
                  return;
                } else {
                  resp.siteCode = site[0].siteCode;
                  resp.siteId = resp.siteCode;
                  resp.activationCode = 'Y';
                  if (typeof (resp.mutationDate) !== 'undefined') {
                    resp.mutationDate = new Date(resp.mutationDate);
                  }
                  this.service.save(resp)
                    .subscribe(
                      res => {
                        this.dataGrid.instance.refresh();
                        this.options.message = 'Asset Change Site Success';
                        notify(this.options, 'success', 3000);
                      }, err => {
                        const msg = err.error.message;
                        if (msg.includes('ConstraintViolationException')) {
                          this.options.message = 'Asset Code Already Exist';
                          notify(this.options, 'error', 3000);
                        }
                      }
                    )
                }

                this.dataGrid.instance.refresh();
              }, err => {
                console.log(err);
              }
            )
        })
    })
    this.confChangeSite = false;
  }
  cancelChangeSite() {
    this.confChangeSite = false;
  }
  onHideSiteSearch(event) {
    if (event.event) {
      this.search.Id = event.event.id;
      this.search.SiteCodeExist = event.event.siteCodeExist;
    }

    this.isShowInfo = false;
    this.siteSearchVsb = false;
  }
  showInfo() {
    console.log('this.isShowInfo: ', this.isShowInfo);
    this.isShowInfo = true;
    console.log('this.isShowInfo: ', this.isShowInfo);
    this.siteSearchVsb = true;
  }
  doSearch() {
    const ini = this;

    // panggil content ready
    ini.dataGrid.instance.refresh();
  }
  onHideAddAsset() {
    this.addVisible = false;
    this.isAdd = false;
    this.doSearch();
  }
  Submit() {}
  onHide() {}
}

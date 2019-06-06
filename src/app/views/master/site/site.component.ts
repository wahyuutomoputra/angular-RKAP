import {
  Component,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {
  SiteService,
  Search
} from './site.service';
import {
  error
} from 'selenium-webdriver';
import {
  Site,
  SiteType
} from './site.model';
import DataSource from 'devextreme/data/data_source';
import 'rxjs/add/operator/toPromise';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';
import {
  DetailComponent
} from './detail/detail.component';

declare const jquery: any;
declare const $: any;

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
  providers: [SiteService, ContextItemService]
})
export class SiteComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  dataTypes: SiteType[];
  gridDataSource: any = {};
  contextItems: any;
  target: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  menuVisible = false;
  isDetail = false;
  isAdd = false;
  addVisible = false;
  siteDetail: any;
  site: any[];
  search: Search;
  title = 'Site';

  constructor(
    @Inject(SiteService) private service: SiteService,
    private CIService: ContextItemService,
    private elementRef: ElementRef
  ) {
    this.search = this.service.getSearch();
    this.contextItems = CIService.getContextItems();
    this.service.getAllType().subscribe(
      resp => {
        this.dataTypes = resp;
      }, err => {
        console.log(err);
      }
    );

    this.service.getAll()
      .subscribe(resp => {
        this.gridDataSource = resp;
      }, err => {
        console.log(err);
      })

    // this.gridDataSource = new DataSource({
    //   load: function (loadOptions) {
    //     return service.getAll(loadOptions.skip / loadOptions.take, loadOptions.take)
    //       .toPromise()
    //       .then(
    //         resp => {
    //           return {
    //             data: resp.content,
    //             totalCount: resp.totalElements
    //           }
    //         }
    //       );
    //   },
    //   insert: function (values) {
    //     return service.save(values).toPromise();
    //   },
    //   update: function (key, values) {
    //     return service.update(key.id, values).toPromise();
    //   }
    // });

  }

  ngAfterViewInit() {
    this.addNewButton()
  }

  addNewButton() {
    console.log('addNewButton')
    const ini = this;
    const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];
    const $customButton = $('<div id="addNewSite">').dxButton({
      icon: 'add',
      text: 'Add New Site',
      onClick: function () {
        ini.isAdd = true;
        ini.addVisible = ini.isAdd;
        ini.title = 'Add New Site';
      }
    });

    d1.append($customButton[0]);
  }
  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    // this.site = this.gridDataSource._items.filter(dataSource => dataSource.siteCode === event)[0];
    this.site = this.gridDataSource.filter(dataSource => dataSource.id === event)[0];
    }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Detail') {
        this.popupVisible = true;
        this.isDetail = true;
      } else if (this.text === 'Edit') {
        notify({
          closeOnClick: true,
          displayTime: 50000,
          message: 'The ' + this.text + ' item was clicked'
        }, 'success');
      } else if (this.text === 'Delete') {
        notify('The ' + this.text + ' item was clicked', 'info', 1500);
        this.confVisible = true;
      }
    }
  }
  onHideMenu() {
    this.menuVisible = false;
  }

  onHideSite() {
    this.popupVisible = false;
  }

  onHideAdd() {
    this.addVisible = false;
    this.isAdd = false;
  }

  selectStatus(data) {
    if (data.value === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['siteType.id', '=', data.value]);
    }
  }
  showInfo() {

  }
  Submit() {}
}

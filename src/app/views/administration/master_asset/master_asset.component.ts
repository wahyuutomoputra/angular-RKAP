import {
  NgModule,
  Component,
  Inject,
  ViewChild
} from '@angular/core';
import {
  MasterAssetService
} from './master_asset.service';
import {
  SiteService
} from '../../master/site/site.service';
import {
  error
} from 'selenium-webdriver';
import {
  Manufactur,
  AssetBrand,
  BrandType
} from './master_asset.model';
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
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxTabPanelModule
} from 'devextreme-angular';
import {
  importExpr
} from '@angular/compiler/src/output/output_ast';
import {
  DetailComponent
} from './detail_manufacture/detail.component'
import {
  DetailBrandComponent
} from './detail_assetbrand/detail.component'
import {
  DetailTypeComponent
} from './detail_type/detail.component'
// import {
//   ManufacturEditComponent
// } from './edit_manufacture/manufacture-edit.component';
@Component({
  selector: 'app-master-asset',
  templateUrl: './master_asset.component.html',
  styleUrls: ['./master_asset.component.css'],
  providers: [MasterAssetService, SiteService, ContextItemService]
})
export class MasterAssetComponent {
  isDelete: boolean;
  isEdit: boolean;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  contextItems: any;
  target: any;
  menuVisible = false;
  isDetail = false;
  detail: any;
  detailAssetbrand: any;
  detailType: any;
  text: any;
  popupManufacture = false;
  popupAssetbrand = false;
  popupType = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  gridDataSource: any = {};
  manufactur: any[];
  brand: any[];
  type: any[];

  isAdd = false;

  addVisible = false;

  menuChecklist = ['Change Site'];

  batchAction = this.menuChecklist[0];

  constructor(
    @Inject(MasterAssetService) private service: MasterAssetService,
    private CIService: ContextItemService,
    private router: Router
  ) {

    this.contextItems = CIService.getContextItems();

    this.service.getAllManufactur()
      .subscribe(
        resp => {
          this.manufactur = resp;
          this.manufactur.forEach(function (value, index, array) {
            if (value.activationCode === 'Y') {
              array[index].activationCode = true;
            } else {
              array[index].activationCode = false;
            }
          });
        }, err => {
          console.log(err);
        }
      );

    this.service.getAllBrand()
      .subscribe(
        resp => {
          this.brand = resp;
          this.brand.forEach(function (value, index, array) {
            if (value.activationCode === 'Y') {
              array[index].activationCode = true;
            } else {
              array[index].activationCode = false;
            }
          });
        }, err => {
          console.log(err);
        }
      );

    this.service.getAllType()
      .subscribe(
        resp => {
          this.type = resp;
          this.type.forEach(function (value, index, array) {
            if (value.activationCode === 'Y') {
              array[index].activationCode = true;
            } else {
              array[index].activationCode = false;
            }
          });
        }, err => {
          console.log(err);
        }
      );
  }


  addButtonManufacture(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        hint: 'Click to Add',
        icon: 'add',
        text: 'Add New Manufacture',
        onClick:  function () {
          ini.isAdd = true;
          ini.addVisible = ini.isAdd;
        }
      }
    });
  }
  addButtonBrand(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        hint: 'Click to Add',
        icon: 'add',
        text: 'Add New Brand',
        onClick:  function () {
          ini.isAdd = true;
          ini.addVisible = ini.isAdd;
        }
      }
    });
  }
  addButtonType(e) {
    const ini = this;
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        hint: 'Click to Add',
        icon: 'add',
        text: 'Add New Type',
        onClick:  function () {
          ini.isAdd = true;
          ini.addVisible = ini.isAdd;
        }
      }
    });
  }

  //ini buat yg edit sama detail//
  showMenu(event, type: string): void {
    this.target = event + type;
    this.menuVisible = true;
    if (type === 'Manufacture') {
      this.detail = this.manufactur.filter(dataSource => dataSource.id === event)[0];
    } else if (type === 'Assetbrand') {
      this.detailAssetbrand = this.brand.filter(dataSource => dataSource.id === event)[0];
    } else if (type === 'Type') {
      this.detailType = this.type.filter(dataSource => dataSource.id === event)[0];
    }
    // console.log('this.detail : ', this.detail);
  }

  itemClick(e, type: string) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Edit') {
        this.isEdit = true;
        this.isAdd = true;
        this.addVisible = true;
        } else 
      if (this.text === 'Detail') {
        if (type === 'Manufacture') {
          this.popupManufacture = true;
        } else if (type === 'Assetbrand') {
          this.popupAssetbrand = true;
        } else if (type === 'Type') {
          this.popupType = true;
        }

        this.isDetail = true;

        // this.locCode = this.detail.locationCode;
        // console.log('d: ', this.detail);
        // console.log('l: ', this.locCode);
        // } else if (this.text === 'Edit') {
        //     this.isEdit = true;
        //     this.router.navigate(['/administration/master_asset/edit', this.target]);
        //   } else if (this.text === 'Delete') {
        //     notify('The ' + this.text + ' item was clicked', 'info', 1500);
        //     this.confVisible = true;
      }
    }
  }
  onValueChanged(e) {
    this.batchAction = e.value;
  }

  go() {
    if (this.batchAction === 'Change Site') {
      console.log(this.dataGrid.instance.getSelectedRowKeys());
    }
  }
  click() {
    console.log('click')
  }
  back() {
    this.detail = false;
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
  onHideManufacture() {
    this.popupManufacture = false;
  }
  onHideAssetbrand() {
    this.popupAssetbrand = false;
  }
  onHideType() {
    this.popupType = false;
  }

  onHideAddManufacture() {
    this.addVisible = false;
    this.isAdd = false;
    this.service .getAllManufactur().subscribe(resp => {
      this.manufactur = resp;
    });
  }
  onHideAddBrand() {
    this.addVisible = false;
    this.isAdd = false;
    this.service .getAllBrand().subscribe(resp => {
      this.brand = resp;
    });
  }
  onHideAddType() {
    this.addVisible = false;
    this.isAdd = false;
    this.service .getAllType().subscribe(resp => {
      this.type = resp;
    });
  }
}

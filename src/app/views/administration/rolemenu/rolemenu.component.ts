import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DxDataGridComponent, DxCheckBoxComponent} from 'devextreme-angular';
import {Search} from './rolemenu.model';
import {RolemenuService} from './rolemenu.service';
import notify from 'devextreme/ui/notify';
import {convertRuleOptions} from 'tslint/lib/configuration';

declare const $: any;

@Component({
  selector: 'app-rolemenu',
  templateUrl: './rolemenu.component.html',
  styleUrls: ['./rolemenu.component.scss'],
  providers: [RolemenuService]
})
export class RolemenuComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  contextItems: any;
  target: any;
  addVisible = false;
  menuVisible = false;
  detail: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  // roles: any[];
  gridDataSource: any = {};
  search: Search;
  isDetail = false;
  isDelete = false;
  isCancel = false;
  isAdv = false;
  isAdd = false;
  isEdit = false;
  chevron = 'chevrondown';

  constructor(
    private elementRef: ElementRef,
    @Inject(RolemenuService) private rolemenuService: RolemenuService
  ) {
    this.search = {
      id: '',
      role_id: '',
      menu_id: '',
    };

    this.contextItems = [
      {
        text: 'Edit',
        disabled: false,
        beginGroup: false,
        items: false
      },
      {
        text: 'Detail',
        disabled: false,
        beginGroup: false,
        items: false
      },
      {
        text: 'Delete',
        disabled: false,
        beginGroup: false,
        items: false
      }
    ];

    this.rolemenuService.getAll()
    .subscribe(resp => {
      console.log(resp);
      this.gridDataSource = resp.d.list;
    }, err => {
      console.log(err);
    })


    // this.getRoleData();
  }

  refresh() {
    this.rolemenuService.getAll().subscribe(resp => {
      this.gridDataSource = resp.d.list;
    }, err => {
      console.log(err);
    })
    this.dataGrid.instance.refresh();
  }

  getRoleData() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    this.rolemenuService.getAll().subscribe(resp => {
      this.rolemenuService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.userRole.id === value.id && element.menuTab.activationCode === 'Y';
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
    });
  }

  ngAfterViewInit() {
    this.addNewButton()
  }

  addNewButton() {
    const ini = this;
    const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];
    const $customButton = $('<div id="addNewRole">').dxButton({
      icon: 'add',
      text: 'Tambah Role Menu Auth Baru',
      onClick: function () {
        ini.isAdd = true;
        ini.addVisible = ini.isAdd;
      }
    });

    d1.append($customButton[0]);
  }

  showAdvSearch() {
    this.isAdv = !this.isAdv;
    if (this.isAdv) {
      this.chevron = 'chevronup';
    } else {
      this.chevron = 'chevrondown';
    }

  }

  searching() {
    this.rolemenuService.getByName(this.search.role_id).subscribe(resp => {
      this.rolemenuService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.userRole.id === value.id;
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      if (this.search.role_id !== '') {
        this.gridDataSource = resp.filter(role => role.roleName === this.search.role_id).filter(data => data.activationCode === 'Y');
      } else {
        this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
      }
    });
  }

  advSearch() {
    this.rolemenuService.getByData(this.search).subscribe(resp => {
      this.rolemenuService.getAllRoleAuth().subscribe(respAuth => {
        resp.forEach((value, index) => {
          const menus = [];
          const menu = respAuth.filter(element => {
            return element.userRole.id === value.id;
          });

          if (Array.isArray(menu)) {
            menu.forEach(menuItem => {
              menus.push(menuItem.menuTab.menuDesciption.toString());
            });
          } else {
            if (typeof menu !== 'undefined') {
              menus.push(menu.menuTab.menuDesciption.toString());
            }
          }

          resp[index].menu = menus;
        })
      });
      if (this.search.role_id !== '') {
        this.gridDataSource = resp.filter(role => role.roleName === this.search.role_id).filter(data => data.activationCode === 'Y');
      } else {
        this.gridDataSource = resp.filter(data => data.activationCode === 'Y');
      }
    });
  }

  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    this.detail = this.gridDataSource.filter(dataSource => dataSource.id === event)[0];
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'Edit') {
        this.isEdit = true;
        this.isAdd = true;
        this.addVisible = true;
      } else if (this.text === 'Detail') {
        this.isDetail = true;
        this.isAdd = true;
        this.addVisible = true;
      } else if (this.text === 'Delete') {
        this.isDelete = true;
        this.confVisible = true;
        this.isCancel = false;
      }
    }
  }

  click() {
  }

  back() {
    this.isDetail = false;
    this.addVisible = false;
    this.isAdd = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  onHideConf() {
    this.confVisible = false;
    this.isDelete = false;
    this.refresh();
    // this.getRoleData();
  }

  onHideProgress() {
    this.progressVisible = false;
  }

  onHideAdd() {
    this.addVisible = false;
    this.isAdd = false;
    this.isEdit = false;
    this.isDetail = false;
    this.target = null;
    this.refresh();
    // this.getRoleData();
  }

  delete() {
    this.confVisible = false;
    this.isDelete = false;
    this.isCancel = false;
  }

  onDeleteConf() {
    this.rolemenuService.getById(this.target).subscribe(role => {
      this.rolemenuService.delete(role.d).subscribe(resp => {
        // this.getRoleData();
        notify({
          closeOnClick: true,
          displayTime: 3000,
          message: 'Item successfully deleted.'
        }, 'success');
        this.refresh();
      }, err => {
        if (err.status === 200) {
          this.getRoleData();
          notify({
            closeOnClick: true,
            displayTime: 3000,
            message: 'Item successfully deleted.'
          }, 'success');
        } else {
          notify({
            closeOnClick: true,
            displayTime: 3000,
            message: 'Deleting failed.'
          }, 'error');
        }
      })
    })
  }
  onCancelConf() {}
}

import { Component, AfterViewInit, ElementRef, ViewChild, Inject, ContentChild
} from '@angular/core';
import {
  DxDataGridComponent
} from 'devextreme-angular';
import {
  Search, User
} from 'app/views/administration/user/user.model';
import {
  UserService
} from 'app/views/administration/user/user.service';
import notify from 'devextreme/ui/notify';
import DataSource from 'devextreme/data/data_source';
import data_grid from 'devextreme/ui/data_grid';
declare const $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements AfterViewInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  contextItems: any;
  target: any;
  addVisible = false;
  menuVisible = false;
  isDetail = false;
  isDelete = false;
  isCancel = false;
  isEdit = false;
  detail: any;
  detailUsers: any;
  detailUserss: any;
  detailUsersHeader: any;
  text: any;
  popupVisible = false;
  confVisible = false;
  progressVisible = false;
  progressTitle: any;
  progressContent: any;

  gridDataSource: any = {};
  name: any;
  sites: any;
  companies: any;
  userid: any;
  siteid: any;
  role: any;
  email: any;
  search: Search;
  users: any;
  isAdv = false;
  isAdd = false;
  roles: any[];
  chevron = 'chevrondown';

  /*popup*/
  isShowInfo = false;
  siteSearchVsb = false;

  constructor(private elementRef: ElementRef, @Inject(UserService) private userService: UserService) {
    this.search = {
      'name': '',
      'userId': '',
      'siteCode': '',
      'roleId': '',
      'email': ''
    }
    this.contextItems = [{
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
      },
      {
        text: 'Set Active / Inactive',
        disabled: false,
        beginGroup: false,
        items: false
      }
    ]

    userService.getAllSite().subscribe(resp => {
      console.log(resp);
      this.sites = resp.d.data;
    });
    userService.getAllCompany().subscribe(resp => {
      this.companies = resp;
    });
    userService.getAllRole().subscribe(resp => {
      this.roles = resp;
    });
  }
  calculateCellValue(data) {
    if (data.status === 'A') {
      return 'ACTIVE'
    } else if (data.status === 'I') {
      return 'INACTIVE'
    } else if (data.status === 'R') {
      return 'REGISTER'
    }
  }
  ngAfterViewInit() {
    this.addNewButton()
  }
  addNewButton() {
    const ini = this;
    const d1 = this.elementRef.nativeElement.getElementsByClassName('dx-toolbar-before')[0];
    const $customButton = $('<div id="addNewLoc">').dxButton({
      icon: 'add',
      text: 'Add New User',
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

  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;
    this.detail = this.users._items.filter(dataSource => dataSource.id === event)[0];
    this.detailUsers = this.users._items.filter(dataSource => dataSource.id === event)[0];

    this.userService.getSiteByID(this.detailUsers.siteCode)
    .subscribe( resp => {
      this.detailUsers.site = resp[0];
    })
    this.userService.getRoleByID(this.detailUsers.roleId)
    .subscribe( resp => {
      this.detailUsers.role = resp[0];
    })
    this.userService.getLanguageByID(this.detailUsers.languageDefaultId)
    .subscribe( resp => {
      this.detailUsers.bahasa = resp[0];
    })
    this.userService.getLocationByID(this.detailUsers.locationTypeId)
    .subscribe( resp => {
      this.detailUsers.location = resp[0];
    })
    this.userService.getCompanyByID(this.detailUsers.companyCode)
    .subscribe( resp => {
      this.detailUsers.kantor = resp[0];
    })

    if (this.detailUsers.status === 'A') {
      this.detailUsers.statususer = 'ACTIVE'
    } else if (this.detailUsers.status === 'I') {
      this.detailUsers.statususer = 'INACTIVE'
    } else if (this.detailUsers.status === 'R') {
      this.detailUsers.statususer = 'REGISTER'
    }

    if (this.detail.status === 'A') {
      this.contextItems[3].text = 'Set Inactive';
    } else if (this.detail.status === 'I') {
      this.contextItems[3].text = 'Set Active';
    } else if (this.detail.status === 'R') {
      this.contextItems[3].status = 'Set Active';
    }

    console.log(this.detailUsers)
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
        // this.addVisible = true;
      } else if (this.text === 'Delete') {
        this.isDelete = true;
        this.confVisible = true;
      } else if (this.text === 'Set Active') {
        let useract = null;
        this.userService.getById(this.target).subscribe(resp => {
          useract = resp;
          console.log(resp);
          this.userService.setactive(useract).subscribe(resp2 => {
            this.userService.getAll().subscribe(resp3 => {
              this.users = resp3.content;
            });
            notify({
              closeOnClick: true,
              displayTime: 5000,
              message: 'User Active'
            }, 'success');
          })
        })
      } else if (this.text === 'Set Inactive') {
        let userinact = null;
        this.userService.getById(this.target).subscribe(resp => {
          userinact = resp;
          console.log(resp);
          this.userService.setinactive(userinact).subscribe(resp2 => {
            this.userService.getAll().subscribe(resp4 => {
              this.users = resp4.content;
            });
            notify({
              closeOnClick: true,
              displayTime: 5000,
              message: 'User Inactive'
            }, 'success');
          })
        })
      }
    }
  }
  delete() {
    this.confVisible = false;
    this.isDelete = false;
    this.isCancel = false;
  }
  searching() {
    this.userService.getByName(this.search.name).subscribe(resp => {
      if (this.search.name !== '') {
        this.users = resp.filter(user => user.status === 'A' || user.status === 'I' || user.status === 'R')
      .filter(user => user.name === this.search.name);
      } else {
        this.users = resp.filter(user => user.status === 'A' || user.status === 'I' || user.status === 'R')
      }
    });
  }

  advSearch() {
    this.userService.getByData(this.search).subscribe(resp => {
      this.users = resp;
    });
  }
  click() {}

  back() {
    this.isDetail = false;
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  onHidePopup() {
    this.popupVisible = false;
  }

  onHideConf() {
    this.isDelete = false;
    this.confVisible = false;
  }
  onDeleteConf() {
    let userdel = null;
    this.userService.getById(this.target).subscribe(resp => {
      userdel = resp;
      console.log(resp);
      this.userService.delete(userdel).subscribe(resp2 => {
        notify({
          closeOnClick: true,
          displayTime: 5000,
          message: 'Item successfully deleted.'
        }, 'success');
        this.userService.getAll().subscribe(resp3 => {
          this.users = resp3.content;
        });
      })
    })
  }
  onHideProgress() {
    this.progressVisible = false;
  }

  showInfo() {
    this.isShowInfo = true;
    this.siteSearchVsb = true;
  }

  doSearch() {
    const ini = this;
    this.users = new DataSource({
      load: function (loadOptions) {
        return ini.userService.getDataBySiteCode(ini.search.siteCode, loadOptions.skip, loadOptions.take)
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

  onHideSiteSearch(event) {
    if (event.event) {
      this.search.siteCode = event.event.siteCodeExist;
    }
    this.isShowInfo = false;
    this.siteSearchVsb = false;
  }

  onHideAdd() {
    this.addVisible = false;
    this.isAdd = false;
    this.isEdit = false;
    this.target = null;
    const ini = this;
    this.users = new DataSource({
      load: function (loadOptions) {
        return ini.userService.getDataBySiteCode(ini.search.siteCode, loadOptions.skip, loadOptions.take)
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
  onCancelConf() {}
}

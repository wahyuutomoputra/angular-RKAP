import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {SysMenuService} from '../sys-menu.service';
// import { AddRoleService } from './role-add.service';

import {Menu, SysMenu, KategoriAktif} from '../sys-menu.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

 @Component({
   selector: 'app-add-sys-menu',
   templateUrl: './sys-menu-add.component.html',
   providers: []
 })
 export class AddSysMenuComponent implements OnInit, AfterViewInit, AfterContentInit {
   @Input() isEdit;
   @Input() isDetail;
   @Input() editItem;
   @Input() addVisible;
   @Output() onHideAdd = new EventEmitter();
   @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;
   @ViewChild(DxFormComponent) formAktif: DxFormComponent;
   @ViewChildren(DxiItemComponent) kontrols: QueryList<DxiItemComponent>;
   @ContentChildren(DxiItemComponent) kontens: QueryList<DxiItemComponent>;

   //model
   role: SysMenu;
   isallowregistration: boolean;
   simpleProducts: string[];
   daftarKategori: KategoriAktif[];
   // cekAktif: boolean;
   previousValue: boolean;
   newValue: boolean;

   menuTree: Menu[] = [];

   confVisible = false;
   isSave = false;
   isCancel = false;

   options = {
     message: '',
     closeOnOutsideClick: true,
     closeOnClick: true,
     closeOnSwipe: true,
     closeOnBackButton: true,
   };

   constructor(private sysmenuService: SysMenuService) {
     this.simpleProducts = sysmenuService.getSimpleProducts();
     this.daftarKategori = sysmenuService.getDaftarKategori();
     this.role = {
       	menu_id: null,
    		parent_menu_id: null,
    		menu_description: null,
    		menu_address: null,
    		active: 1,
    		jenis_object: null,
    		expanded: null,
    		menu_order: null,
    		icon_style: null,
    		registration_by: null,
    		registration_date: null,
    		modified_by: null,
    		modified_date: null,
    };
   }

   ngOnInit() {
    if (this.isEdit || this.isDetail) {
      const today = new Date().toISOString().slice(0, 10);
      const username = localStorage.getItem('username');
      this.sysmenuService.getById(this.editItem).subscribe(respRole => {
        console.log(respRole);
        console.log(this.editItem);
        const nilai: string = respRole.d.active;
        this.role = {
          menu_id: respRole.d.menu_id,
    		  parent_menu_id: respRole.d.parent_menu_id,
    		  menu_description: respRole.d.menu_description,
    		  menu_address: respRole.d.menu_address,
    		  active: parseInt(nilai,10),
    		  jenis_object: respRole.d.jenis_object,
    		  expanded: respRole.d.expanded,
    		  menu_order: respRole.d.menu_order,
    		  icon_style: respRole.d.icon_style,
    		  registration_by: null,
    		  registration_date: null,
    		  modified_by: null,
    		  modified_date: null,
        };
        // this.newValue = respRole.d.isallowregistration;

      })
    } else { // New Record
      this.role = {
        menu_id: null,
    		parent_menu_id: null,
    		menu_description: null,
    		menu_address: null,
    		active: 1,
    		jenis_object: null,
    		expanded: null,
    		menu_order: null,
    		icon_style: null,
    		registration_by: null,
    		registration_date: null,
    		modified_by: null,
    		modified_date: null,
      };

      // this.treeList.instance.refresh();
    }

   }

   ngAfterViewInit() {
    // console.log(this.kontrols);
    this.kontrols.forEach((item) => {
      // console.log('name = ' + item.name + ' datafield = ' + item.dataField + ', editorType = ' + item.editorType);
    });
  }

  ngAfterContentInit() {
    /*
    this.kontrols.forEach((item) => {
      console.log(item);
    });
    */
    // this.role.isallowregistration = 1;
  }

  dateBox_valueChanged (e) {
    this.previousValue = e.previousValue;
    this.newValue = e.value;
    console.log('checked = ' + e.value);
    // Event handling commands go here
  };

  checkBoxToggled(e) {
    // console.log('isaktif = ' + this.role.isallowregistration);
    console.log('newvalue = ' + this.newValue);
    this.previousValue = e.previousValue;
    this.newValue = e.value;
    console.log('previousValue = ' + e.previousValue + ' newValue = ' + e.value);
    // alert(e.value);
  }

   addToMenu(item) {
     if (!this.menuTree.length) {
       this.menuTree = [];
     }
     this.menuTree.push(item);
   }

   save(e) {
     this.confVisible = true;
     this.isSave = true;
     this.isCancel = false;
     e.preventDefault();
   }
   cancel() {
     this.confVisible = true;
     this.isSave = false;
     this.isCancel = true;
   }
   onHideConf() {
     this.confVisible = false;
   }
   onSaveConf() {
     this.treeList.instance.saveEditData();
     this.role.jenis_object = this.role.jenis_object.toUpperCase();
     //console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
     //convert
     const nilai: number = this.role.active;
     this.role.active = nilai.toString();
     let success = false;
     if (!this.isEdit) {
       this.role.menu_id = null;
       this.sysmenuService.save(this.role).subscribe(resp => {
         console.log(resp);
         success = true;
         this.menuTree.forEach(menuItem => {
           if (menuItem.read || menuItem.write) {
             let read = 'N', write = 'N';
             if (menuItem.read) {
               read = 'Y';
             }
             if (menuItem.write) {
               write = 'Y';
             }
             this.sysmenuService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: {id: menuItem.menuId},
               userRole: {id: resp.id}
             }).subscribe(() => {}, () => {
               success = false;
             })
           }
         });

         if (success) {
           // this.options.message = 'Role saved';
           // notify(this.options, 'success', 3000);
           notify({message: 'Role berhasil disimpan', position: {my: 'center top', at: 'center top'}},
            'success', 3000);
           this.hide();
         } else {
           this.options.message = 'Saving Failed';
           notify(this.options, 'error', 3000);
         }
       }, err => {
         this.options.message = 'Saving Failed';
         notify(this.options, 'error', 3000);
       })
     } else {
       this.sysmenuService.update(this.role).subscribe(resp => {
        console.log(this.role);
        success = true;

         this.menuTree.forEach(menuItem => {
           if (menuItem.read || menuItem.write) {
             let read = 'N', write = 'N';
             if (menuItem.read) {
               read = 'Y';
             }
             if (menuItem.write) {
               write = 'Y';
             }

             if (typeof menuItem.authId === 'undefined') {
              this.sysmenuService.saveRoleAuth({
                read: read,
                write: write,
                menuTab: { id: menuItem.menuId },
                userRole: { id: resp.id }
              }).subscribe(() => { }, () => {
                success = false;
              })
            } else {
              this.sysmenuService.updateRoleAuth({
                authId: menuItem.authId,
                read: read,
                write: write,
                menuTab: { id: menuItem.menuId },
                userRole: { id: resp.id }
              }).subscribe(() => { }, () => {
                success = false;
              })
            }
           } else {
             if (typeof menuItem.authId !== 'undefined') {
               this.sysmenuService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                 success = false;
               });
             }
           }
         });

         if (success) {
           this.options.message = 'Role updated';
           notify(this.options, 'success', 3000);
           this.hide();
         } else {
           this.options.message = 'Updating Failed';
           notify(this.options, 'error', 3000);
         }
         }, err => {
           this.options.message = 'Updating Failed';
           notify(this.options, 'error', 3000);
         }
       )
     }
   }
   onCancelConf() {
     this.addVisible = false;
     this.hide();
   }
   hide() {
     this.onHideAdd.emit();
   }

   toolbarPreparing(e) {
     e.toolbarOptions.visible = false;
   }

   cellClick(e) {
     this.treeList.instance.saveEditData();
   }

   rowUpdated(e) {
     console.log('updated', e, this.menuTree);
     const menuChecked = this.menuTree.find(menu => menu.menuId === e.key);

     this.menuTree.forEach((menu, index) => {
       if (menu.menuParent === e.key) {
         if (typeof e.data.read !== 'undefined') {
           this.menuTree[index].read = e.data.read;
         }
         if (typeof e.data.write !== 'undefined') {
           this.menuTree[index].write = e.data.write;
         }
       }
     })

     if (typeof menuChecked.menuParent !== 'undefined') {
       const menuChild = this.menuTree.filter(menu => menu.menuParent === menuChecked.menuParent);

       let read = 0, write = 0;
       menuChild.forEach(menu => {
         // console.log(menu)
         if (menu.read) {
           read++;
         }

         if (menu.write) {
           write++;
         }
       })

       if (read > 0) {
         this.menuTree.forEach((menu, index) => {
           if (menu.menuId === menuChecked.menuParent) {
             this.menuTree[index].read = true;
           }
         })
       }

       if (write > 0) {
         this.menuTree.forEach((menu, index) => {
           if (menu.menuId === menuChecked.menuParent) {
             this.menuTree[index].write = true;
           }
         })
       }
     }
   }
 }

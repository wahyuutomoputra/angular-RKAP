import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {MisiService} from '../misi.service';

import {Menu, Misi, KategoriAktif} from '../misi.model';
import notify from 'devextreme/ui/notify';
import { DxPopupModule, DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

 @Component({
   selector: 'app-add-misi',
   templateUrl: './misi-add.component.html',
   providers: []
 })
 export class AddMisiComponent implements OnInit, AfterViewInit, AfterContentInit {
   @Input() isEdit;
   @Input() isDetail;
   @Input() editItem;
   @Input() addVisible;
   @Output() onHideAdd = new EventEmitter();
   @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;
   @ViewChild(DxPopupModule) Aktif: DxPopupModule;
   @ViewChild(DxFormComponent) formAktif: DxFormComponent;
   @ViewChildren(DxiItemComponent) kontrols: QueryList<DxiItemComponent>;
   @ContentChildren(DxiItemComponent) kontens: QueryList<DxiItemComponent>;

   //model
   role: Misi;
   isallowregistration: boolean;
   simpleProducts: string[];
   daftarKategori: KategoriAktif[];
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

   constructor(private misiService: MisiService) {
     this.simpleProducts = misiService.getSimpleProducts();
     
     this.role = {
       	misi_id: null,
    		misi: null,
    		urutan: null,
    };
   }

   ngOnInit() {
    if (this.isEdit) {
      const today = new Date().toISOString().slice(0, 10);
      const username = localStorage.getItem('username');
      this.misiService.getById(this.editItem).subscribe(respRole => {
        console.log(respRole);
        console.log(this.editItem);
        const nilai: string = respRole.d.misi_id;
        this.role = {
          misi_id: respRole.d.misi_id,
          misi: respRole.d.misi,
          urutan: respRole.d.urutan,
        };
      })
    } else { // New Record
      this.role = {
        misi_id: null,
        misi: null,
        urutan: null,
      };
    }
   }

   ngAfterViewInit() {
    this.kontrols.forEach((item) => {
    });
  }

  ngAfterContentInit() {
  }

  dateBox_valueChanged (e) {
    this.previousValue = e.previousValue;
    this.newValue = e.value;
    console.log('checked = ' + e.value);
  };

  checkBoxToggled(e) {
    console.log('newvalue = ' + this.newValue);
    this.previousValue = e.previousValue;
    this.newValue = e.value;
    console.log('previousValue = ' + e.previousValue + ' newValue = ' + e.value);
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
     const nilai: number = this.role.urutan;
     this.role.urutan = nilai.toString();
     let success = false;
     if (!this.isEdit) {
       this.role.misi_id = null;
       this.misiService.save(this.role).subscribe(resp => {
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
             this.misiService.saveRoleAuth({
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
           notify({message: 'Misi berhasil disimpan', position: {my: 'center top', at: 'center top'}},
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
       this.misiService.update(this.role).subscribe(resp => {
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
              this.misiService.saveRoleAuth({
                read: read,
                write: write,
                menuTab: { id: menuItem.menuId },
                userRole: { id: resp.id }
              }).subscribe(() => { }, () => {
                success = false;
              })
            } else {
              this.misiService.updateRoleAuth({
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
               this.misiService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                 success = false;
               });
             }
           }
         });

         if (success) {
           this.options.message = 'Misi updated';
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

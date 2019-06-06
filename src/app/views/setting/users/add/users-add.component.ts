import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {UsersService} from '../users.service';
// import { AddRoleService } from './role-add.service';

import {Menu, Users, KategoriAktif, Provinsi} from '../users.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

 @Component({
   selector: 'app-add-users',
   templateUrl: './users-add.component.html',
   providers: []
 })
 export class AddUsersComponent implements OnInit, AfterViewInit, AfterContentInit {
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
   role: Users;
   isallowregistration: boolean;
   simpleProducts: string[];
   daftarKategori: KategoriAktif[];
   daftarProvinsi: Provinsi[];
   daftarRole = [];
   // cekAktif: boolean;
   previousValue: boolean;
   newValue: boolean;

   prov = "";
   kota = "";
   kec = "";
   kelurahan = "";
   pos = "";
   alamat = "";
   cekUser = true;

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

   constructor(private usersService: UsersService) {
     this.validateLogin = this.validateLogin.bind(this);
     this.daftarKategori = usersService.getDaftarKategori();
     this.daftarProvinsi = usersService.getDaftarProvinsi();
     console.log(this.daftarProvinsi)
     this.usersService.getRole().subscribe(resp=>{
       this.daftarRole = resp.d.list;
       console.log(this.daftarRole);
     })
     
     this.role = {
       userid: null,
       username: null,
       nama: null,
       password: null,
       jabatan_id: null,
       entitas_id: null,
       role_id: null,
       active: null,
       language_default_id: null,
       alamat: null,
       propinsi: null,
       kota: null,
       kecamatan: null,
       kelurahan: null,
       kodepos: null,
       nohp: null,
       email: null,
       description: null,
       photo_url: null,
       registration_by: null,
       registration_date: null,
       activation_by: null,
       activation_date: null,
       deactivation_by: null,
       deactivation_date: null,
       activation_code: null,
       modified_by: null,
       modified_date: null,
    };
   }

   ngOnInit() {
    if (this.isEdit || this.isDetail) {
      const today = new Date().toISOString().slice(0, 10);
      const username = localStorage.getItem('username');
      console.log(this.editItem);
      this.usersService.getById(this.editItem).subscribe(respRole => {
        console.log(respRole);
        const nilai: string = respRole.d.userid;
        this.role = {
          userid: respRole.d.userid,
          username: respRole.d.username,
          nama: respRole.d.nama,
          password: respRole.d.password,
          jabatan_id: respRole.d.jabatan_id,
          entitas_id: respRole.d.entitas_id,
          role_id: respRole.d.role_id,
          active: respRole.d.active,
          language_default_id: respRole.d.language_default_id,
          alamat: respRole.d.alamat,
          propinsi: respRole.d.propinsi,
          kota: respRole.d.kota,
          kecamatan: respRole.d.kecamatan,
          kelurahan: respRole.d.kelurahan,
          kodepos: respRole.d.kodepos,
          nohp: respRole.d.nohp,
          email: respRole.d.email,
          description: respRole.d.description,
          photo_url: respRole.d.photo_url,
          registration_by: respRole.d.registration_by,
          registration_date: respRole.d.registration_date,
          activation_by: respRole.d.activation_by,
          activation_date: respRole.d.activation_date,
          deactivation_by: respRole.d.deactivation_by,
          deactivation_date: respRole.d.deactivation_date,
          activation_code: respRole.d.activation_code,
          modified_by: respRole.d.modified_by,
          modified_date: respRole.d.modified_date,
        };
        // this.newValue = respRole.d.isallowregistration;

      })
    } else { // New Record
      this.role = {
       userid: null,
       username: null,
       nama: null,
       password: null,
       jabatan_id: null,
       entitas_id: null,
       role_id: null,
       active: null,
       language_default_id: null,
       alamat: null,
       propinsi: null,
       kota: null,
       kecamatan: null,
       kelurahan: null,
       kodepos: null,
       nohp: null,
       email: null,
       description: null,
       photo_url: null,
       registration_by: null,
       registration_date: null,
       activation_by: null,
       activation_date: null,
       deactivation_by: null,
       deactivation_date: null,
       activation_code: null,
       modified_by: null,
       modified_date: null,
    };

      // this.treeList.instance.refresh();
    }

   }


   validateLogin(params){
     this.usersService.getByUsername(params.value).subscribe(resp => {
       if (Object.keys(resp.d).length===0) {
         this.cekUser = false;
       }else{
         this.cekUser = true;
       }
    }, err => {
      console.log(err);
    })
     return this.cekUser;
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
     //this.treeList.instance.saveEditData();
     //console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
     //const nilai: number = this.role.urutan;
     //this.role.urutan = nilai.toString();
     this.role.active = this.role.active.toString();
     this.role.role_id = this.role.role_id.toString();  
     let success = false;
     if (!this.isEdit) {
       this.role.userid = null;
       this.usersService.save(this.role).subscribe(resp => {
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
             this.usersService.saveRoleAuth({
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
       this.usersService.update(this.role).subscribe(resp => {
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
              this.usersService.saveRoleAuth({
                read: read,
                write: write,
                menuTab: { id: menuItem.menuId },
                userRole: { id: resp.id }
              }).subscribe(() => { }, () => {
                success = false;
              })
            } else {
              this.usersService.updateRoleAuth({
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
               this.usersService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
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

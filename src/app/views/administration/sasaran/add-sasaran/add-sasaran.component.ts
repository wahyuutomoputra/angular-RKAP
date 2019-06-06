import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {SasaranService} from '../sasaran.service';
// import { AddRoleService } from './role-add.service';

import {Menu, Sasaran, KategoriAktif} from '../sasaran.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';
import { MatButtonToggleGroupMultiple } from '@angular/material';

 @Component({
   selector: 'app-add-sasaran',
   templateUrl: './add-sasaran.component.html',
   providers: []
 })
 export class AddSasaranComponent implements OnInit, AfterViewInit, AfterContentInit {
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
  role: Sasaran;
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

  constructor(private sasaranService: SasaranService) {
    this.simpleProducts = sasaranService.getSimpleProducts();
    
    this.role = {
       rjppid: null,
       sid: null,
       parent_ssid: null,
       sasaran: null,
       indikator_nilai: null,
       indikator_satuan: null,
       deskripsi: null,
       tahun: null,
       jenis_sasaran: null,
       indikator:null,
       perspektif: null,
       arah_pengembangan: null,
   };
  }

  ngOnInit() {
   if (this.isEdit || this.isDetail) {
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.sasaranService.getById(this.editItem).subscribe(respRole => {
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.sid;
       this.role = {
         rjppid: respRole.d.rjppid,
         sid: respRole.d.sid,
         //urutan: parseInt(nilai),
         parent_ssid: respRole.d.parent_ssid,
         sasaran: respRole.d.sasaran,
         indikator_nilai: respRole.d.indikator_nilai,
         indikator_satuan: respRole.d.indikator_satuan,
         deskripsi: respRole.d.deskripsi,
         tahun: respRole.d.tahun,
         jenis_sasaran: respRole.d.jenis_sasaran,
         indikator: respRole.d.indikator,
         perspektif: respRole.d.perspektif,
         arah_pengembangan: respRole.d.arah_pengembangan,
       };
       // this.newValue = respRole.d.isallowregistration;

     })
   } else { // New Record
     this.role = {
       rjppid: null,
       sid: null,
       parent_ssid: null,
       sasaran: null,
       indikator_nilai: null,
       indikator_satuan:null,
       deskripsi: null,
       tahun: null,
       jenis_sasaran: null,
       indikator: null,
       perspektif: null,
       arah_pengembangan:null,
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
    //console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
    const nilai: number = this.role.sid;
    this.role.sid = nilai;
    let success = false;
    if (!this.isEdit) {
      this.role.sid = null;
      this.sasaranService.save(this.role).subscribe(resp => {
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
            this.sasaranService.saveRoleAuth({
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
          notify({message: 'Sasaran berhasil disimpan', position: {my: 'center top', at: 'center top'}},
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
      this.sasaranService.update(this.role).subscribe(resp => {
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
             this.sasaranService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           } else {
             this.sasaranService.updateRoleAuth({
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
              this.sasaranService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                success = false;
              });
            }
          }
        });

        if (success) {
          this.options.message = 'Sasaran updated';
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

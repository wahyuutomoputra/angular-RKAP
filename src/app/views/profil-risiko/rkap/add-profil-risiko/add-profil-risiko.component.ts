import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {ProfilRisikoService} from '../profil-risiko.service';
// import { AddRoleService } from './role-add.service';

import {Menu, ProfilRisiko, KategoriAktif} from '../profil-risiko.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

@Component({
  selector: 'app-add-profil-risiko',
  templateUrl: './add-profil-risiko.component.html',
  providers: []
})

export class AddProfilRisikoComponent implements OnInit, AfterViewInit, AfterContentInit {
  Rjpp: string[];
  Sasaran: string[];
  Tahun: string[];
  daftarRjpp = [];
  daftarSasaran = [];
  daftarTaksonomi = [];
  daftarDepartemen = [];

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
  role: ProfilRisiko;
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

  constructor(private profilrisikoService: ProfilRisikoService) {
    this.simpleProducts = profilrisikoService.getSimpleProducts();
    // this.Rjpp =  profilrisikoService.getRjpp();
    // this.Sasaran =  profilrisikoService.getSasaran();
    this.Tahun =  profilrisikoService.getTahun();
    this.profilrisikoService.getRjpp().subscribe(respRole=>{
      this.daftarRjpp = respRole.d.list;
    })
    this.profilrisikoService.getSasaran().subscribe(respRole=>{
      this.daftarSasaran = respRole.d.list;
    })
    this.profilrisikoService.getTaksonomi().subscribe(respRole=>{
      this.daftarTaksonomi = respRole.d.list;
    })
    this.profilrisikoService.getDepartemen().subscribe(respRole=>{
      this.daftarDepartemen = respRole.d.list;
    })
    
    this.role = {
      riskid: null,
      risiko: null,
      deskripsi: null,
      rjppid: null,
      sid: null,
      sifat: null,
      jenis: null,
      direktur_terkait: null,
      tingkat: null,
      dampak: null,
      kemungkinan: null,
      velositas: null,
      penyebab_interna: null,
      penyebab_eksternal: null,
      tipe_risiko: null,
      justifikasi_dampak: null,
      justifikasi_kemungkinan: null,
      mitigasi: null,
      taxoid: null,
      tahun: null,
      deptid: null,
   };
  }

  ngOnInit() {
   if (this.isEdit || this.isDetail) {
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.profilrisikoService.getById(this.editItem).subscribe(respRole => {
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.riskid;
       this.role = {
        riskid: respRole.d.riskid,
        risiko: respRole.d.risiko,
        deskripsi: respRole.d.deskripsi,
        rjppid: respRole.d.rjppid,
        sid: respRole.d.sid,
        sifat: respRole.d.sifat,
        jenis: respRole.d.jenis,
        direktur_terkait: respRole.d.direktur_terkait,
        tingkat: respRole.d.tingkat,
        dampak: respRole.d.dampak,
        kemungkinan: respRole.d.kemungkinan,
        velositas: respRole.d.velositas,
        penyebab_interna: respRole.d.penyebab_interna,
        penyebab_eksternal: respRole.d.penyebab_eksternal,
        tipe_risiko: respRole.d.tipe_risiko,
        justifikasi_dampak: respRole.d.justifikasi_dampak,
        justifikasi_kemungkinan: respRole.d.justifikasi_kemungkinan,
        mitigasi: respRole.d.mitigasi,
        taxoid: respRole.d.taxoid,
        tahun: respRole.d.tahun,
        deptid: respRole.d.deptid,
       };
       // this.newValue = respRole.d.isallowregistration;

     })
   } else { // New Record
     this.role = {
      riskid: null,
      risiko: null,
      deskripsi: null,
      rjppid: null,
      sid: null,
      sifat: null,
      jenis: null,
      direktur_terkait: null,
      tingkat: null,
      dampak: null,
      kemungkinan: null,
      velositas: null,
      penyebab_interna: null,
      penyebab_eksternal: null,
      tipe_risiko: null,
      justifikasi_dampak: null,
      justifikasi_kemungkinan: null,
      mitigasi: null,
      taxoid: null,
      tahun: null,
      deptid: null,
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
    const nilai: number = this.role.riskid;
    this.role.riskid = nilai;
    let success = false;
    if (!this.isEdit) {
      this.role.riskid = null;
      this.profilrisikoService.save(this.role).subscribe(resp => {
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
            this.profilrisikoService.saveRoleAuth({
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
          notify({message: 'Profil Risiko berhasil disimpan', position: {my: 'center top', at: 'center top'}},
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
      this.profilrisikoService.update(this.role).subscribe(resp => {
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
             this.profilrisikoService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           } else {
             this.profilrisikoService.updateRoleAuth({
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
              this.profilrisikoService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                success = false;
              });
            }
          }
        });

        if (success) {
          this.options.message = 'Profil Risiko updated';
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


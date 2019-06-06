import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {EntriNonRkapService} from '../entri-non-rkap.service';

import {Menu, NonRkap, KategoriAktif, IndikatorInput, IndikatorOutput, Rab, DokumenRkap} from '../entri-non-rkap.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';
import { MatButtonToggleGroupMultiple } from '@angular/material';


@Component({
  selector: 'app-add-non-rkap',
  templateUrl: './add-non-rkap.component.html',
  providers: []
})
export class AddNonRkapComponent implements OnInit, AfterViewInit, AfterContentInit {
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
  role: NonRkap;
  indikatorInput: IndikatorInput;
  indikatorOutput: IndikatorOutput;
  rab: Rab;
  dokumen: DokumenRkap;
  isallowregistration: boolean;
  simpleProducts: string[];
  daftarKategori: KategoriAktif[];
  previousValue: boolean;
  newValue: boolean;
  daftarRjpp = [];
  daftarSasaran = [];
  daftarProker = [];
  daftarPortofolio =[];
  daftarSatuan = [];
  daftarDepartemen =[];

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

  constructor(private rkapService: EntriNonRkapService) {
    this.simpleProducts = rkapService.getSimpleProducts();

    this.rkapService.getRjpp().subscribe(resp=>{
      this.daftarRjpp = resp.d.list;
    })

    this.rkapService.getSasaran().subscribe(resp=>{
      this.daftarSasaran = resp.d.list;
    })

    this.rkapService.getProker().subscribe(resp=>{
      this.daftarProker = resp.d.list;
    })
    
    this.rkapService.getPortofolio().subscribe(resp=>{
      this.daftarPortofolio = resp.d.list;
    })

    this.rkapService.getSatuan().subscribe(resp=>{
      this.daftarSatuan = resp.d.list;
    })

    this.rkapService.getDepartemen().subscribe(resp=>{
      this.daftarDepartemen = resp.d.list;
    })

    this.role = {
      rjppid: null,
      sid: null,
      prkid: null,
      rkapid: null,
      program_kerja:'',
      deskripsi: '',
      jenis_anggaran: '',
      tipe_rkap: '',
      no_kontrak_existing: '',
      tgl_akhir_kontak: '',
      nilai_kontak: '',
      usulan_anggaran: '',
      gid: null,
      prioritas: '',
      no_io: '',
      plan_tgl_mulai: '',
      plan_tgl_akhir: '',
      indikator_outcome: '',
      lokasi: '',
      deptid: null,
      jenis_oca: '',
      nilai_rkap: '',
      mata_uang_kontrak: '',
      riskid: null,
      mata_uang: '',
   };

   this.indikatorInput = {
    indikator: '',
    nilai: '',
    satuanid: null,
    deptid: null,
   };

   this.indikatorOutput = {
    indikator: '',
    nilai: '',
    satuanid: null,
   }

   this.dokumen = {
    nama_dokumen: '',
    jenis_file: '',
    link_dok: '',
   }

   this.rab = {
    rincian: '',
    volume: '',
    nilai: '',
    satuanid: null,
   }
  }

  ngOnInit() {
   if (this.isEdit || this.isDetail) {
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.rkapService.getById(this.editItem).subscribe(respRole => {
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.rkapid;
       this.role = {
         rjppid: respRole.rjppid,
         sid: respRole.sid,
         prkid: respRole.prkid,
         rkapid: respRole.rkapid,
         program_kerja: respRole.program_kerja,
         deskripsi: respRole.deskripsi,
         jenis_anggaran: respRole.jenis_anggaran,
         tipe_rkap: respRole.tipe_rkap,
         no_kontrak_existing: respRole.no_kontrak_existing,
         tgl_akhir_kontak: respRole.tgl_akhir_kontak,
         nilai_kontak: respRole.nilai_kontak,
         usulan_anggaran: respRole.usulan_anggaran,
         gid: respRole.gid,
         prioritas: respRole.prioritas,
         no_io: respRole.no_io,
         plan_tgl_mulai: respRole.plan_tgl_mulai,
         plan_tgl_akhir: respRole.plan_tgl_akhir,
         indikator_outcome: respRole.indikator_outcome,
         lokasi: respRole.lokasi,
         deptid: respRole.deptid,
         jenis_oca: respRole.jenis_oca,
         nilai_rkap: respRole.nilai_rkap,
         mata_uang_kontrak: respRole.mata_uang_kontrak,
         riskid: respRole.riskid,
         mata_uang: respRole.mata_uang,
       };
       this.indikatorInput = {
         indikator: respRole.indikator,
         nilai: respRole.nilai,
         satuanid: respRole.satuanid,
         deptid: respRole.deptid,
       };
       this.indikatorOutput = {
         indikator: respRole.indikator,
         nilai: respRole.nilai,
         satuanid: respRole.satuanid,
       };
       this.dokumen = {
         nama_dokumen: respRole.nama_dokumen,
         jenis_file: respRole.jenis_file,
         link_dok: respRole.link_dok,
       };
       this.rab = {
         rincian: respRole.rincian,
         volume: respRole.volume,
         nilai: respRole.nilai,
         satuanid: respRole.satuanid,
       }
     })
   } else {
     this.role = {
      rjppid: null,
      sid: null,
      prkid: null,
      rkapid: null,
      program_kerja:'',
      deskripsi: '',
      jenis_anggaran: '',
      tipe_rkap: '',
      no_kontrak_existing: '',
      tgl_akhir_kontak: '',
      nilai_kontak: '',
      usulan_anggaran: '',
      gid: null,
      prioritas: '',
      no_io: '',
      plan_tgl_mulai: '',
      plan_tgl_akhir: '',
      indikator_outcome: '',
      lokasi: '',
      deptid: null,
      jenis_oca: '',
      nilai_rkap: '',
      mata_uang_kontrak: '',
      riskid: null,
      mata_uang: '',
     };
     this.indikatorInput = {
      indikator: '',
      nilai: '',
      satuanid: null,
      deptid: null,
     };
     this.indikatorOutput = {
      indikator: '',
      nilai: '',
      satuanid: null, 
     };
     this.rab = {
      rincian: '',
      volume: '',
      nilai: '',
      satuanid: null,
     };
     this.dokumen = {
      nama_dokumen: '',
      jenis_file: '',
      link_dok: '',
     };
   }

  }

  ngAfterViewInit() {
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
    //const nilai: number = this.role.rkapid;
    const nilai: number = this.role.rkapid;
    //this.role.rkapid = nilai.toString();
    this.role.rkapid = nilai
    let success = false;
    if (!this.isEdit) {
      this.role.rkapid = null;
      this.rkapService.save(this.role).subscribe(resp => {
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
            this.rkapService.saveRoleAuth({
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
          notify({message: 'RKAP berhasil disimpan', position: {my: 'center top', at: 'center top'}},
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
      this.rkapService.update(this.role).subscribe(resp => {
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
             this.rkapService.saveRoleAuth({
               read: read,
               write: write,
               menuTab: { id: menuItem.menuId },
               userRole: { id: resp.id }
             }).subscribe(() => { }, () => {
               success = false;
             })
           } else {
             this.rkapService.updateRoleAuth({
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
              this.rkapService.deleteRoleAuth(menuItem.authId).subscribe(() => { }, () => {
                success = false;
              });
            }
          }
        });

        if (success) {
          this.options.message = 'RKAP updated';
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

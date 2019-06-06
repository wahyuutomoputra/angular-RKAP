import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {ObyektifService} from '../obyektif.service';
// import { AddRoleService } from './role-add.service';

import {Menu, Obyektif, KategoriAktif} from '../obyektif.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';

 @Component({
   selector: 'app-add-obyektif',
   templateUrl: './obyektif-add.component.html',
   providers: []
 })
 export class AddObyektifComponent implements OnInit, AfterViewInit, AfterContentInit {
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
   role: Obyektif;
   isallowregistration: boolean;
   jenisSasaran: string[];
   daftarKategori: KategoriAktif[];
   // cekAktif: boolean;
   previousValue: boolean;
   newValue: boolean;
   daftarRjpp = [];
   daftarSatuan = [];
   strategis = false;
   obyektif = false;
   daftarSstrategis = [];
   daftarSobyektif = [];

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

   constructor(private obyektifService: ObyektifService) {
     this.obyektifService.getRjpp().subscribe(resp=>{
       this.daftarRjpp = resp.d.list;
     })
     this.obyektifService.getSatuan().subscribe(resp=>{
       this.daftarSatuan = resp.d.list;     
     })
     this.obyektifService.getStrategis().subscribe(resp=>{
       this.daftarSstrategis = resp.d.list;
     })

     
     this.role = {
       	rjppid: null,
        sid: null,
        parent_ssid: null,
        sasaran: null,
        indikator_nilai: null,
        satuanid: null,
        deskripsi: null,
        tahun: null,
        jenis_sasaran: null,
        indikator: null,
        perspektif: null,
        arah_pengembangan: null,
        created_date: null,
        created_by: null,
        updated_date: null,
        updated_by: null,
    };
   }

   ngOnInit() {
    if (this.isEdit || this.isDetail) {
      const today = new Date().toISOString().slice(0, 10);
      const username = localStorage.getItem('username');
      this.obyektifService.getById(this.editItem).subscribe(respRole => {
        console.log(respRole);
        console.log(this.editItem);
        const nilai: string = respRole.d.visi_id;
        this.role = {
          rjppid: respRole.d.rjppid,
          sid: respRole.d.sid,
          parent_ssid: respRole.d.parent_ssid,
          sasaran: respRole.d.sasaran,
          indikator_nilai: respRole.d.indikator_nilai,
          satuanid: respRole.d.satuanid,
          deskripsi: respRole.d.deskripsi,
          tahun: respRole.d.tahun,
          jenis_sasaran: respRole.d.jenis_sasaran,
          indikator: respRole.d.indikator,
          perspektif: respRole.d.perspektif,
          arah_pengembangan: respRole.d.arah_pengembangan,
          created_date: respRole.d.created_date,
          created_by: respRole.d.created_by,
          updated_date: respRole.d.updated_date,
          updated_by: respRole.d.updated_by,
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
        satuanid: null,
        deskripsi: null,
        tahun: null,
        jenis_sasaran: null,
        indikator: null,
        perspektif: null,
        arah_pengembangan: null,
        created_date: null,
        created_by: null,
        updated_date: null,
        updated_by: null,
      };

      // this.treeList.instance.refresh();
    }

   }

   ngAfterViewInit() {
    this.kontrols.forEach((item) => {
    });
  }

  ngAfterContentInit() {
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
     //console.log('isdisplayed sebelum disave = ' + this.role.isdisplayed);
     // const nilai: number = this.role.sid.toString();
     // this.role.sid = nilai.toString();
     this.role.indikator_nilai = this.role.indikator_nilai.toString();
     let success = false;
     if (!this.isEdit) {
       this.role.sid = null;
       this.role.jenis_sasaran = "Obyektif";
       this.obyektifService.save(this.role).subscribe(resp => {
         console.log(resp);
         success = true;

         if (success) {
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
       this.obyektifService.update(this.role).subscribe(resp => {
        console.log(this.role);
        success = true;

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

 }

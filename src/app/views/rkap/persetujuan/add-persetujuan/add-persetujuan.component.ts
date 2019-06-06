import {
  Component,
  Input,
  Output,
  EventEmitter, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ContentChildren, AfterContentChecked, AfterContentInit
 } from '@angular/core';
import {PersetujuanService} from '../persetujuan.service';

import {Menu, Rkap, KategoriAktif, IndikatorInput, IndikatorOutput, Rab, DokumenRkap} from '../persetujuan.model';
import notify from 'devextreme/ui/notify';
import {DxTreeListComponent, DxValidatorModule, DxValidationSummaryModule, DxFormComponent, DxPopupModule} from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested/item-dxi';
import { MatButtonToggleGroupMultiple } from '@angular/material';


@Component({
  selector: 'app-add-persetujuan',
  templateUrl: './add-persetujuan.component.html',
  providers: []
})

export class AddPersetujuanComponent implements OnInit, AfterViewInit, AfterContentInit {
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
  role: Rkap;
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
  daftarProfilRisiko = [];
  daftarIndikatorInput = [];
  InputInserted = [];
  ii = [];
  iu = [];
  InputRemoved = [];
  InputUpdated = [];
  rkapid = null;

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

  constructor(private rkapService: PersetujuanService) {
    this.simpleProducts = rkapService.getSimpleProducts();

    this.rkapService.getSasaran().subscribe(resp=>{
      this.daftarSasaran = resp.d.list;
    })

    this.rkapService.getProker().subscribe(resp=>{
      this.daftarProker = resp.d.list;
    })
    
    this.rkapService.getPortofolio().subscribe(resp=>{
      this.daftarPortofolio = resp.d.list;
    })

    this.rkapService.getDepartemen().subscribe(resp=>{
      this.daftarDepartemen = resp.d.list;
    })

    this.rkapService.getProfilRisiko().subscribe(resp=>{
      this.daftarProfilRisiko = resp.d.list;
    })

    this.rkapService.getSatuan().subscribe(resp=>{
      this.daftarSatuan = resp.d.list;
    })


    this.role = {
      rjppid: null,
      sid: null,
      prkid: null,
      rkapid: null,
      program_kerja:null,
      deskripsi: null,
      jenis_anggaran: null,
      tipe_rkap: null,
      no_kontrak_existing: null,
      tgl_akhir_kontak: null,
      nilai_kontrak: null,
      usulan_anggaran: null,
      gid: null,
      prioritas: null,
      no_io: null,
      plan_tgl_mulai: null,
      plan_tgl_akhir: null,
      indikator_outcome: null,
      lokasi: null,
      deptid: null,
      jenis_oca: null,
      nilai_rkap: null,
      mata_uang_kontrak: null,
      riskid: null,
      mata_uang: null,
   };

   
     this.indikatorOutput = {
      indikator: null,
      nilai: null,
      satuanid: null, 
     };
     this.rab = {
      rincian: null,
      volume: null,
      nilai: null,
      satuanid: null,
      rkapid: null,
     };
     this.dokumen = {
      nama_dokumen: null,
      jenis_file: null,
      link_dok: null,
     };
  }

  ngOnInit() {
    console.log(this.editItem);
    
   if (this.isEdit || this.isDetail) {
     this.rkapid=this.editItem;
     const today = new Date().toISOString().slice(0, 10);
     const username = localStorage.getItem('username');
     this.rkapService.getById(this.editItem).subscribe(respRole => {
        this.rkapService.getIndikatorInput(this.editItem).subscribe(resp=>{
          console.log(resp)
          this.daftarIndikatorInput = resp.d.list;
        })
       console.log(respRole);
       console.log(this.editItem);
       const nilai: string = respRole.d.rkapid;
       this.role = {
         rjppid: respRole.d.rjppid,
         sid: respRole.d.sid,
         prkid: respRole.d.prkid,
         rkapid: respRole.d.rkapid,
         program_kerja: respRole.d.program_kerja,
         deskripsi: respRole.d.deskripsi,
         jenis_anggaran: respRole.d.jenis_anggaran,
         tipe_rkap: respRole.d.tipe_rkap,
         no_kontrak_existing: respRole.d.no_kontrak_existing,
         tgl_akhir_kontak: respRole.d.tgl_akhir_kontak,
         nilai_kontrak: respRole.d.nilai_kontrak,
         usulan_anggaran: respRole.d.usulan_anggaran,
         gid: respRole.d.gid,
         prioritas: respRole.d.prioritas,
         no_io: respRole.d.no_io,
         plan_tgl_mulai: respRole.d.plan_tgl_mulai,
         plan_tgl_akhir: respRole.d.plan_tgl_akhir,
         indikator_outcome: respRole.d.indikator_outcome,
         lokasi: respRole.d.lokasi,
         deptid: respRole.d.deptid,
         jenis_oca: respRole.d.jenis_oca,
         nilai_rkap: respRole.d.nilai_rkap,
         mata_uang_kontrak: respRole.d.mata_uang_kontrak,
         riskid: respRole.d.riskid,
         mata_uang: respRole.d.mata_uang,
       };
     
       
      
       this.dokumen = {
         nama_dokumen: respRole.d.nama_dokumen,
         jenis_file: respRole.d.jenis_file,
         link_dok: respRole.d.link_dok,
       };
       this.rab = {
         rincian: respRole.d.rincian,
         volume: respRole.d.volume,
         nilai: respRole.d.nilai,
         satuanid: respRole.d.satuanid,
         rkapid: respRole.d.rkapid,
       }
     })
   } else {
     this.role = {
        rjppid: null,
        sid: null,
        prkid: null,
        rkapid: null,
        program_kerja:null,
        deskripsi: null,
        jenis_anggaran: null,
        tipe_rkap: null,
        no_kontrak_existing: null,
        tgl_akhir_kontak: null,
        nilai_kontrak: null,
        usulan_anggaran: null,
        gid: null,
        prioritas: null,
        no_io: null,
        plan_tgl_mulai: null,
        plan_tgl_akhir: null,
        indikator_outcome: null,
        lokasi: null,
        deptid: null,
        jenis_oca: null,
        nilai_rkap: null,
        mata_uang_kontrak: null,
        riskid: null,
        mata_uang: null,
     };
    
     this.indikatorOutput = {
      indikator: null,
      nilai: null,
      satuanid: null, 
     };
     this.rab = {
      rincian: null,
      volume: null,
      nilai: null,
      satuanid: null,
      rkapid: null,
     };
     this.dokumen = {
      nama_dokumen: null,
      jenis_file: null,
      link_dok: null,
     };
   }

  }

  form_fieldDataChanged(e) {
    if (e.dataField=="prkid") {
      this.rkapService.getProkerById(e.value).subscribe(resp=>{
        this.role.sid = resp.d.sid;
        this.role.rjppid = resp.d.rjppid;
      })
    }
  }

  indikatorInputUpdated(e) {
    console.log(e);
    let itemIndex=null;
    this.iu = this.InputInserted;
    this.iu.forEach((item, index) => {
        if (item.key === e.key) {
            itemIndex = index;
        }
    });
    if(itemIndex!=null){
      this.InputInserted.splice(itemIndex, 1);
      this.InputInserted.push(e.data);
    }else{
      this.InputRemoved.push(e.data);
    }
  }

  indikatorInputRemoved(e) {
    console.log(e);
    console.log(e.key)
    let itemIndex=null;
    this.ii = this.InputInserted;
    this.ii.forEach((item, index) => {
        if (item.key === e.key) {
            itemIndex = index;
        }
    });
    if(itemIndex!=null){
      this.InputRemoved.splice(itemIndex, 1);
    }else{
      this.InputRemoved.push(e.data);
    }
  }

  indikatorInputInserted(e) {
    console.log(e);
    this.InputInserted.push(e.data);
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
    //const nilai: number = this.role.rkapid;
    const nilai: number = this.role.rkapid;
    //this.role.rkapid = nilai.toString();
    this.role.rkapid = nilai
    let success = false;
    if (!this.isEdit) {
      this.role.rkapid = null;
      this.role.sid = this.role.sid.toString();
      this.role.prkid = this.role.prkid.toString();
      this.role.rjppid = this.role.rjppid.toString();
      this.role.gid = this.role.gid.toString();
      this.role.nilai_kontrak = this.role.nilai_kontrak.toString();
      this.role.usulan_anggaran = this.role.usulan_anggaran.toString();
      this.role.deptid = this.role.deptid.toString();
      this.role.nilai_rkap = this.role.nilai_rkap.toString();
      this.role.riskid = this.role.riskid.toString();
      this.role.program_kerja = 'proker';
      this.rkapService.save(this.role).subscribe(resp => {
        this.rkapid = resp.d;
        this.transaksiIndikatorInput();
       this.transaksiRab("input");
        console.log(resp);
        
        success = true;
  
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
        this.transaksiIndikatorInput();
       console.log(this.role);
       success = true;

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

  transaksiRab(e){
    console.log(e);
    this.rab.rincian = this.rab.rincian.toString();
    this.rab.volume = this.rab.volume.toString();
    this.rab.nilai = this.rab.nilai.toString();
    this.rab.satuanid = this.rab.satuanid.toString();
    this.rab.rkapid = this.rab.rkapid.toString();

    if (e=="input") {
      console.log(this.indikatorInput);
       this.rkapService.saveRab(this.rab).subscribe(resp => {
         console.log(resp);
       })
    }else if(e=="update"){
      console.log(this.indikatorInput);
       this.rkapService.updateRab(this.rab).subscribe(resp => {
         console.log(resp);
       })

    }

  }
 
  transaksiIndikatorInput(){
    console.log(this.InputInserted);
    for(let insert of this.InputInserted){
       this.indikatorInput = {
         rkapid: this.rkapid.toString(),
         indikator: insert.indikator,
         nilai: insert.nilai.toString(),
         satuanid: insert.satuanid.toString(),
         deptid: insert.deptid.toString(),
         indid: null,
       };
       
       console.log(this.indikatorInput);
       this.rkapService.saveIndikatorInput(this.indikatorInput).subscribe(resp => {
         console.log(resp);
       })
     }

    for(let remove of this.InputRemoved){
      this.rkapService.removeIndikatorInput(remove.indid).subscribe(resp => {
         console.log(resp);
       })
    }

    for(let update of this.InputUpdated){
      this.indikatorInput = {
         rkapid: this.rkapid,
         indikator: update.indikator,
         nilai: update.nilai,
         satuanid: update.satuanid,
         deptid: update.deptid,
         indid: update.indid,
       };
       console.log(this.indikatorInput);
       this.rkapService.updateIndikatorInput(this.indikatorInput).subscribe(resp => {
         console.log(resp);
       })

    }

  }

  hide() {
    this.onHideAdd.emit();
  }

  indikatorInputUpdate(e){
    
  }
}

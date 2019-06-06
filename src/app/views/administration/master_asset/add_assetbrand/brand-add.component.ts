 import {
   Component,
   Input,
   Output,
   EventEmitter,
   OnInit
 } from '@angular/core';
 import {MasterAssetService} from '../master_asset.service';
 import {AssetBrand} from '../master_asset.model';
 import DataSource from 'devextreme/data/data_source';
 import notify from 'devextreme/ui/notify';
import { Service } from './brand-add.service';

 @Component({
   selector: 'app-add-brand',
   templateUrl: './brand-add.component.html',
   providers: [Service]
 })
 export class AddAssetBrandComponent implements OnInit{
   @Input() isEdit;
   @Input() editItem;
   @Input() addVisible;
   @Output() onHideAddBrand = new EventEmitter();

   sitePopup = false;
   assetBrand: AssetBrand;
   confVisible = false;
   isSave = false;
   isCancel = false;
   roles: any[];
   options = {
     message: '',
     closeOnOutsideClick: true,
     closeOnClick: true,
     closeOnSwipe: true,
     closeOnBackButton: true,
   }
   constructor(private masterAssetService: MasterAssetService) {
     this.assetBrand = {
      id: null,
      name: null,
      manufactur: null,
      createdBy: null,
      createdDate: null,
      modifiedBy: null,
      modifiedDate: null,
      activationBy: null,
      activationDate: null,
      deactivationBy: null,
      deactivationDate: null,
      description: null,
      appendix: null
     };
     masterAssetService.getAllManufactur().subscribe(resp => {
       this.assetBrand = resp;
     });
  }
   saveAssetBrand(e) {
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
    if (!this.isEdit) {
      this.assetBrand.id = null;
     this.masterAssetService.saveBrand(this.assetBrand).subscribe(resp => {

       this.options.message = 'Location saved';
       notify(this.options, 'success', 3000);
       this.hide();
     }, err => {
       const msg = err.error.message;
       console.log(msg);
       this.options.message = 'Saving Failed';
       notify(this.options, 'error', 3000);
     })
     } else {
       this.assetBrand.id = this.editItem;
       this.masterAssetService.updateBrand(this.assetBrand).subscribe(resp => {
         this.options.message = 'User updated';
         notify(this.options, 'success', 3000);
         this.hide();
       }, err => {
         const msg = err.error.message;
         console.log(err);
         this.options.message = 'Updating Failed';
         notify(this.options, 'error', 3000);
       })
     }
   }

   ngOnInit() {
     if (this.isEdit) {
       this.masterAssetService.getById(this.editItem).subscribe(resp => {
         this.assetBrand = {
          id: resp.id,
          name: resp.name,
          manufactur: resp.manufactur,
          createdBy: resp.createdBy,
          createdDate: resp.createdDate,
          modifiedBy: resp.modifiedBy,
          modifiedDate: resp.modifiedDate,
          activationBy: resp.activationBy,
          activationDate: resp.activationDate,
          deactivationBy: resp.deactivationBy,
          deactivationDate: resp.deactivationDate,
          description: resp.description,
          appendix: resp.appendix
         };
       })
     } else {
       this.assetBrand = {
        id: null,
        name: null,
        manufactur: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
        activationBy: null,
        activationDate: null,
        deactivationBy: null,
        deactivationDate: null,
        description: null,
        appendix: null
       };
     }
   }
  // getIdSite(id) {
  //   let e;
  //   e = this.searchSiteById._items.filter(source => source.siteCodeExist === id)[0]
  //   console.log(
  //   'e : ', e.unit
  //   );
  //   this.manufactur.siteCode= id;
  //   this.sitePopup = false;
  // }

   onCancelConf() {
     this.addVisible = false;
     this.hide();
   }
   hide() {
     this.onHideAddBrand.emit();
   }
   showInfo() {
     this.sitePopup = true;
   }
  //  showSubstation() {
  //    this.substationSearchVsb = true;
  //  }
 }

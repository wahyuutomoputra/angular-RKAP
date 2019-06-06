 import {
   Component,
   Input,
   Output,
   EventEmitter,
   OnInit
 } from '@angular/core';
 import {MasterAssetService} from '../master_asset.service';
 import {BrandType} from '../master_asset.model';
 import DataSource from 'devextreme/data/data_source';
 import notify from 'devextreme/ui/notify';
import { Service } from './type-add.service';
import { Type } from '@angular/compiler/src/output/output_ast';

 @Component({
   selector: 'app-add-type',
   templateUrl: './type-add.component.html',
   providers: [Service]
 })
 export class AddTypeComponent implements OnInit{
   @Input() isEdit;
   @Input() editItem;
   @Input() addVisible;
   @Output() onHideAddType = new EventEmitter();

   sitePopup = false;
   type: BrandType;
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
     this.type = {
      id: null,
      name: null,
      manufactur: null,
      assetbrand: null,
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
       this.type = resp;
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
      this.type.id = null;
     this.masterAssetService.saveBrand(this.type).subscribe(resp => {
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
       this.type.id = this.editItem;
       this.masterAssetService.updateBrand(this.type).subscribe(resp => {
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
         this.type = {
          id: resp.id,
          name: resp.name,
          manufactur: resp.manufactur,
          assetbrand: resp.assetbrand,
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
       this.type = {
        id: null,
        name: null,
        manufactur: null,
        assetbrand: null,
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
     this.onHideAddType.emit();
   }
   showInfo() {
     this.sitePopup = true;
   }
  //  showSubstation() {
  //    this.substationSearchVsb = true;
  //  }
 }
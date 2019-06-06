 import {
   Component,
   Input,
   Output,
   EventEmitter,
   OnInit
 } from '@angular/core';
 import {MasterAssetService} from '../master_asset.service';
 import {Manufactur} from '../master_asset.model';
 import DataSource from 'devextreme/data/data_source';
 import notify from 'devextreme/ui/notify';
import { Service } from './manufacture-add.service';

 @Component({
   selector: 'app-add-manufactur',
   templateUrl: './manufacture-add.component.html',
   providers: [Service]
 })
 export class AddManufactureComponent implements OnInit{
   @Input() isEdit;
   @Input() editItem;
  //  searchSiteById: any;
   @Input() Manufactur;
   @Input() addVisible;

   @Output() onHideAddManufacture = new EventEmitter();

  //  siteSearchVsb = false;
  //  substationSearchVsb = false;
   sitePopup = false;
   manufactur: Manufactur;
   confVisible = false;
   isSave = false;
   isCancel = false;
   roles: any[];
  //  preventDefault: any[];
   options = {
     message: '',
     closeOnOutsideClick: true,
     closeOnClick: true,
     closeOnSwipe: true,
     closeOnBackButton: true,
   }
   constructor(private masterAssetService: MasterAssetService) {
     this.manufactur = {
       id: null,
       address: null,
       city: null,
       telephone1: null,
       telephone2: null,
       name: null,
       email: null,
       province:null,
       country: null,
       postalCode: null,
       facsimile: null,
       director: null,
       directorEmail: null,
       marketing: null,
       marketingEmail: null,
       engineering: null,
       engineeringEmail: null,
       engineeringPhone: null,
       photo: null,
       latitude: null,
       longitude: null,
       timeZone: null,
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
       this.manufactur = resp;
     });
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
    if (!this.isEdit) {
      this.manufactur = null;
     this.masterAssetService.saveManufactur(this.manufactur).subscribe(resp => {
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
       this.manufactur.id = this.editItem;
       this.masterAssetService.updateManufactur(this.manufactur).subscribe(resp => {
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
         this.manufactur = {
          id: resp.id,
          address: resp.address,
          city: resp.city,
          telephone1: resp.telephone1,
          telephone2: resp.telephone2,
          name: resp.name,
          email: resp.email,
          province: resp.province,
          country: resp.country,
          postalCode: resp.postalCode,
          facsimile: resp.facsimile,
          director: resp.director,
          directorEmail: resp.directorEmail,
          marketing: resp.marketing,
          marketingEmail: resp.marketingEmail,
          engineering: resp.engineering,
          engineeringEmail: resp.engineeringEmail,
          engineeringPhone: resp.engineeringPhone,
          photo: resp.photo,
          latitude: resp.latitude,
          longitude: resp.longitude,
          timeZone: resp.timeZone,
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
       this.manufactur = {
        id: null,
        address: null,
        city: null,
        telephone1: null,
        telephone2: null,
        name: null,
        email: null,
        province:null,
        country: null,
        postalCode: null,
        facsimile: null,
        director: null,
        directorEmail: null,
        marketing: null,
        marketingEmail: null,
        engineering: null,
        engineeringEmail: null,
        engineeringPhone: null,
        photo: null,
        latitude: null,
        longitude: null,
        timeZone: null,
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
     this.onHideAddManufacture.emit();
   }
   showInfo() {
     this.sitePopup = true;
   }
  //  showSubstation() {
  //    this.substationSearchVsb = true;
  //  }
 }
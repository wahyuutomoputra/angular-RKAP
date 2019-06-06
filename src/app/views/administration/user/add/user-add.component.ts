 import {
   Component,
   Input,
   Output,
   EventEmitter,
   OnInit
 } from '@angular/core';
 import {UserService} from '../user.service';
 import {User} from '../user.model';
 import DataSource from 'devextreme/data/data_source';
 import notify from 'devextreme/ui/notify';
import { ActivatedRoute } from '@angular/router/src/router_state';

 @Component({
   selector: 'app-add-user',
   templateUrl: './user-add.component.html',
   providers: []
 })
 export class AddUserComponent implements OnInit {
   @Input() isEdit;
   @Input() editItem;
   @Input() addVisible;
   searchSiteById: any;
   @Output() onHideAdd = new EventEmitter();
   ldap = [
     'PLN User LDAP',
     'ICON+ User LDAP',
     'No LDAP'
   ]
   siteSearchVsb = false;
   substationSearchVsb = false;
   sitePopup = false;
   user: User;
   confVisible = false;
   isSave = false;
   isCancel = false;
   isShowInfo = false;
   roles: any[];
   languages: any[];
   locations: any[];
   options = {
     message: '',
     closeOnOutsideClick: true,
     closeOnClick: true,
     closeOnSwipe: true,
     closeOnBackButton: true,
   }
   constructor(private userService: UserService) {
     this.user = {
       id: null,
       siteCode: null,
       roleId: null,
       userId: null,
       name: null,
       locationTypeId: null,
       languageDefaultId: null,
       telephone1: null,
       telephone2: null,
       state: null,
       province: null,
       city: null,
       address: null,
       postalCode: null,
       email: null,
       photoUrl: null,
       formUser: null,
       status: null,
       country: null,
       facsimile: null,
       ldap: null,
       activationCode: 'Y',
       companyCode: null,
       siteCodeExist: null
     };
     userService.getAllLocation().subscribe(resp => {
       this.locations = resp;
     });
     userService.getAllLanguage().subscribe(resp => {
       this.languages = resp;
     });
     userService.getAllRole().subscribe(resp => {
       this.roles = resp;
     });
     this.searchSiteById = new DataSource({
       load: function (loadOptions) {
         if (loadOptions.filter !== undefined) {
           let a: any = [];
           a = loadOptions.filter[2];
           return userService.getSiteByID(a).toPromise().then(resp => {
             this.dataSourceSite = resp;
             this.siteChildren = resp;
             const sitess = [];
             resp.forEach(element => {
               let parent = ' ';
               if (element.parentSite) {
                 parent = element.parentSite.siteName
               }
               if (sitess) {
                 sitess.push({
                       'siteCode': element.siteCode,
                       'name': element.name,
                       'level': element.siteType.siteLevel,
                       'unit': element.unit,
                       'parent': parent
                     })
               }
             });
             this.dataSourceSite = sitess;
             return this.dataSourceSite;
           }, err => {
             console.log('Error  .... ');
             console.log(err);
           });
         }
       }
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
   hideAdd() {
     this.siteSearchVsb = false;
   }
   onSaveConf() {
     this.userService.getBySiteCodeExist(this.user.siteCodeExist).subscribe(resp => {
       this.user.siteCode = resp[0].siteCode;
       this.user.siteCodeExist = resp[0].siteCodeExist;
       this.user.companyCode = resp[0].company.companyCode;

     if (this.user.status === true) {
       this.user.status = 'A';
       this.user.activationCode = 'Y';
     } else {
       this.user.status = 'I';
       this.user.activationCode = 'N';
     }
    if (!this.isEdit) {
      this.user.id = null;
     this.userService.save(this.user).subscribe(respsave => {
       this.options.message = 'User saved';
       notify(this.options, 'success', 3000);
       this.hide();
     }, err => {
       const msg = err.error.message;
       console.log(err);
       if (msg.includes('ConstraintViolationException')) {
         this.options.message = 'User ID or Email Already Exist';
         notify(this.options, 'error', 3000);
       } else {
         this.options.message = 'Saving Failed';
         notify(this.options, 'error', 3000);
       }
     })
     } else {
       this.user.id = this.editItem;
       this.userService.update(this.user).subscribe(respupdate => {
         this.options.message = 'User updated';
         notify(this.options, 'success', 3000);
         this.hide();
       }, err => {
         const msg = err.error.message;
         console.log(err);
         if (msg.includes('ConstraintViolationException')) {
           this.options.message = 'User ID or Email Already Exist';
           notify(this.options, 'error', 3000);
         } else {
           this.options.message = 'Updating Failed';
           notify(this.options, 'error', 3000);
          }
       })
      }
    })
   }
   ngOnInit() {
     if (this.isEdit) {
       this.userService.getById(this.editItem).subscribe(resp => {
         let status = true;
         if (resp.status === 'A') {
           status = true;
         } else {
           status = false;
         }
         this.user = {
           id: resp.id,
           siteCode: resp.siteCode,
           roleId: resp.roleId,
           userId: resp.userId,
           name: resp.name,
           languageDefaultId: resp.languageDefaultId,
           locationTypeId: resp.locationTypeId,
           telephone1: resp.telephone1,
           telephone2: resp.telephone2,
           state: resp.state,
           province: resp.province,
           city: resp.city,
           address: resp.address,
           postalCode: resp.postalCode,
           email: resp.email,
           photoUrl: resp.photoUrl,
           formUser: resp.formUser,
           status: status,
           ldap: resp.ldap,
           activationCode: resp.activationCode,
           passwd: resp.passwd,
           facsimile: resp.facsimile,
           country: resp.country,
           companyCode: resp.companyCode,
           siteCodeExist: resp.siteCodeExist
         };
       })
     } else {
       this.user = {
         id: null,
         siteCode: null,
         roleId: null,
         userId: null,
         name: null,
         languageDefaultId: null,
         locationTypeId: null,
         telephone1: null,
         telephone2: null,
         state: null,
         province: null,
         country: null,
         facsimile: null,
         city: null,
         address: null,
         postalCode: null,
         email: null,
         passwd: null,
         photoUrl: null,
         formUser: null,
         status: null,
         ldap: null,
         activationCode: null,
         companyCode: null,
         siteCodeExist: null
       };
     }
   }
  getIdSite(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCode === id)[0]
    this.user.siteCode = id;
    this.siteSearchVsb = false;
  }
   onCancelConf() {
     this.addVisible = false;
     this.hide();
   }
   hide() {
     this.onHideAdd.emit();
   }
   showInfo() {
     this.isShowInfo = true;
     this.siteSearchVsb = true;
   }
   onHideSiteSearch(event) {
     if (event.event) {
       this.user.siteCodeExist = event.event.siteCodeExist;
     }
     this.isShowInfo = false;
     this.siteSearchVsb = false;
   }

   showSubstation() {
     this.substationSearchVsb = true;
   }
   passwdCompare = () => {
     return this.user.passwd;
    };
 }

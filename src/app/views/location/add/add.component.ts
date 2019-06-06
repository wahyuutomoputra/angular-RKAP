 import {
   NgModule,
   Component,
   Input,
   Output,
   EventEmitter
 } from '@angular/core';
 import {
   JsonPipe,
   DatePipe
 } from '@angular/common';
 import {
   BrowserModule
 } from '@angular/platform-browser';
 import {
   platformBrowserDynamic
 } from '@angular/platform-browser-dynamic';

 import {
   DxTabPanelModule,
   DxCheckBoxModule,
   DxTemplateModule,
   DxFormModule,
   DxVectorMapModule,
   DxChartModule,
   DxMapModule
 } from 'devextreme-angular';



 import {
   LocationService
 } from '../location.service';

 import {
   Location,
   LocationAttributeValue,
 } from '../location.model'

 import {
   Marker,
   MapService
 } from './_map';
 import {
  SELECTOR
 } from 'ngx-bootstrap/modal/modal-options.class';

 import ValidationEngine from 'devextreme/ui/validation_engine';
 import notify from 'devextreme/ui/notify';
 import {
   SiteSearchService
 } from '../../shared/_siteSearch.service';
 @Component({
   selector: 'app-add-location',
   templateUrl: './add.component.html',
   providers: [LocationService, MapService, SiteSearchService]
 })
 export class AddLocationComponent {
   @Input() addVisible;
   @Output() onHideAdd = new EventEmitter();
   siteSearchVsb = false;
   substationSearchVsb = false;
   itemCount: number;
   LocationTypes: String[];
   Provinces: String[];
   Cities: String[];
   Units: String[];
   location: Location;
   locationAttributeValue: LocationAttributeValue;
   siteId: any;

   customMarkerUrl: string;
   mapMarkerUrl: string;
   markers: Marker[];
   confVisible = false;
   isSave = false;
   isCancel = false;

   options = {
     message: '',
     closeOnOutsideClick: true,
     closeOnClick: true,
     closeOnSwipe: true,
     closeOnBackButton: true,
   }
   constructor(
     private service: LocationService,
     mapService: MapService,
     private siteService: SiteSearchService) {

     this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
     this.markers = mapService.getMarkers();

     this.location = {
       'address': null,
       'city': null,
       'country': null,
       'createdBy': null,
       'createdDate': null,
       'description': null,
       'email': null,
       'facsimile': null,
       'id': null,
       'latitude': null,
       'locationCode': null,
       'locationType': null,
       'longitude': null,
       'modifiedBy': null,
       'modifiedDate': null,
       'mutationCode': null,
       'mutationDate': null,
       'name': null,
       'photoUrl': null,
       'postalCode': null,
       'power': null,
       'province': null,
       'punit': null,
       'siteCode': null,
       'status': null,
       'substation': null,
       'tariff': null,
       'telephone1': null,
       'telephone2': null,
     };

     this.locationAttributeValue = {
       'id': null,
       'locationId': null,
       'locationAttributeId': null,
       'dataType': null,
       'valueChar': null,
       'valueDate': null,
       'valueInteger': null,
       'valueNumber': null
     }

     this.LocationTypes = [
       'Customer',
       'Substation',
       'Meter Point'
     ];
     this.Units = [
       'kWh',
       'kW',
       'kVArh',
       'kVA'
     ];

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
     const tempLType = this.location.locationType;
     let postLType;
     if (tempLType === 'Customer') {
       postLType = '1';
     } else if (tempLType === 'Substation') {
       postLType = '2';
     } else if (tempLType === 'Meter Point') {
       postLType = '3';
     }
     this.siteService.getSiteByID(this.location.siteCode)
       .subscribe(
         resp => {
           if (resp.length === 0) {
             this.options.message = 'Site doesn`t exist';
             notify(this.options, 'error', 3000);
             return;
           } else {
             this.location.siteCode = resp[0].siteCodeExist;
             this.location.locationType = postLType;
             if (this.location.mutationDate !== null) {
               this.location.mutationDate = new Date(this.location.mutationDate);
             }
             this.service.save(this.location)
               .subscribe(
                 res => {

                   // create location attribute class
                   //  const a =  this.locationAttributeValue;
                   //  a.locationId = res.location.id;
                   //  a.locationAttributeId = '1';
                   //  a.dataType = 'NUMBER';
                   //  a.valueNumber = this.location;

                   this.options.message = 'Location saved';
                   notify(this.options, 'success', 3000);

                   this.hide();
                 }, err => {
                   const msg = err.error.message;
                   console.log(msg);
                   if (msg.includes('ConstraintViolationException')) {
                     this.options.message = 'Location Code Already Exist';
                     notify(this.options, 'error', 3000);
                     this.location.locationType = tempLType;
                   }
                 }
               )
           }
         }, err => {
           console.log(err);
         }
       )

   }
   onCancelConf() {
     this.addVisible = false;
     this.hide();
   }
   hide() {
     this.onHideAdd.emit();
   }
   checkCustomMarker(data) {
     this.mapMarkerUrl = data.value ? this.customMarkerUrl : null;
   }
   showTooltips() {
     this.markers = this.markers.map(function (item) {
       item.tooltip.isShown = true;
       return item;
     });
   }
   showInfo() {
     this.siteSearchVsb = true;
   }
   onHideSiteSearch($event) {
     this.location.siteCode = $event.event;
     this.siteSearchVsb = false;
   }
   showSubstation() {
     this.substationSearchVsb = true;
   }
   onHideSubstationSearch($event) {
     this.location.substation = $event.event;
   }
 }

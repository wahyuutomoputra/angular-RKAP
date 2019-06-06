 import {
   NgModule,
   Component,
   Input,
   Output,
   EventEmitter
 } from '@angular/core';
 import {
   JsonPipe
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
   Company,
   Service
 } from './tab.service';

 import {
   Marker,
   MapService
 } from './_map';
 import {
  SELECTOR
 } from 'ngx-bootstrap/modal/modal-options.class';

 @Component({
   selector: 'app-editing',
   templateUrl: './tab.component.html',
   providers: [Service, MapService]
 })
 export class TabComponent {
   @Input() addVisible;
   @Output() onHide = new EventEmitter();

   companies: Company[];
   itemCount: number;
   LocationTypes: String[];
   Provinces: String[];
   Cities: String[];
   Units: String[];
   location = {
     LocationId: 'LocationIdValue',
     LocationCode: 'LocationCodeValue',
     LocationName: 'LocationNameValue',
     LocationType: 'LocationTypeValue',
     Site: 'SiteValue',
     Province: 'ProvinceValue',
     City: 'CityValue',
     Address: 'AddressValue',
     PostalCode: 'PostalCodeValue',
     Phone1: 'Phone1Value',
     Phone2: 'Phone2Value',
     Faxcimile: 'FaxcimileValue',
     Email: 'EmailValue',
     Photo: 'PhotoValue',
     Tariff: 'TariffValue',
     Capacity: 'CapacityValue',
     Unit: 'UnitValue',
     CTRatio: 'CTRatioValue',
     CTPrimary: 'CTPrimaryValue',
     CTSecondary: 'CTSecondaryValue',
     PTRatio: 'PTRatioValue',
     PTPrimary: 'PTPrimaryValue',
     PTSecondary: 'PTSecondaryValue',
     Substation: 'SubstationValue',
     ContractNo: 'ContractNoValue',
     MeterFactor: 'MeterFactorValue',
     kWhFactor: 'kWhFactorValue',
     kVArhFactor: 'kVArhFactorValue',
     TrfLosesFact: 'TrfLosesFactValue',
     MutationDate: 'MutationDateValue',
     MutationCode: 'MutationCodeValue',
     LocationMap: 'LocationMapValue',
     Status: 'StatusValue',
     Desctription: 'DesctriptionValue',
     RegisterDate: 'RegisterDateValue',
     RegisterBy: 'RegisterByValue',
     LastModifiedBy: 'LastModifiedByValue',
     Meter: 'MeterValue',
     CommDevice: 'CommDeviceValue',
     SimCard: 'SimCardValue',
     LoadProfile: 'LoadProfileValue',
     Billing: 'BillingValue',
     Instant: 'InstantValue',
     MeterEvent: 'MeterEventValue',
     CommEvent: 'CommEventValue',
     LocationLog: 'LocationLogValue',
   }


   customMarkerUrl: string;
   mapMarkerUrl: string;
   markers: Marker[];


   constructor(service: Service, mapService: MapService) {
     this.customMarkerUrl = this.mapMarkerUrl = mapService.getMarkerUrl();
     this.markers = mapService.getMarkers();

     this.companies = service.getCompanies();
     this.itemCount = this.companies.length;
     this.LocationTypes = [
       'HR Manager',
       'IT Manager',
       'CEO',
       'Controller',
       'Sales Manager',
       'Support Manager',
       'Shipping Manager'
     ];
     this.Provinces = [
       'Sumatera Barat',
       'Nusa Tenggara Barat'
     ];
     this.Cities = [
       'Padang',
       'Mataram'
     ];
     this.Units = [
       'kWh',
       'kW',
       'kVarh',
       'kVa'
     ];
   }

   hide() {
     this.onHide.emit();
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
 }

//  @NgModule({
//    imports: [
//      BrowserModule,
//      DxTabPanelModule,
//      DxCheckBoxModule,
//      DxTemplateModule,
//      DxFormModule,
//      DxVectorMapModule,
//      DxChartModule,
//      DxMapModule
//    ],
//    declarations: [TabComponent],
//    exports: [TabComponent],
//    bootstrap: [TabComponent]
//  })
//  export class AppModule {}

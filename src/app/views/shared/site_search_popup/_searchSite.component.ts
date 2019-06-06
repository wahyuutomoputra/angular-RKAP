import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  SearchSiteService
} from './_searchSite.service';
import {
  DxContextMenuModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxFormComponent,
  DxLookupModule,
  DxDateBoxModule,
  DxChartModule,
  DxScrollViewComponent,
  DxScrollViewModule
} from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-search-site',
  templateUrl: './_searchSite.html',
  providers: [SearchSiteService]
})
export class SearchSiteComponent {
  @Input() siteSearchVsb;
  @Output() onHideSiteSearch = new EventEmitter();

  siteId: any;
  searchSiteById: any;
  sitePopup = false;

  constructor(service: SearchSiteService) {
    console.log('constructor:', this);
    this.sitePopup = true;

    this.searchSiteById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          a = loadOptions.filter[2];
          return service.getSiteByID(a).toPromise().then(resp => {
            this.dataSourceSite = resp;
            this.siteChildren = resp;
            let sites1: any;
            let sites2: any;
            let sites3: any;
            let sitess: any;
            this.siteChildren.forEach(element => {
              sites1 = element.childSite;
              if (sitess == null) {
                sitess = [{
                  'siteCodeExist': element.siteCodeExist,
                  'name': element.name,
                  'level': element.siteType.siteLevel,
                  'unit': element.unit,
                  'id': element.id
                }];
              }
              if (sites1.length > 0) {
                sites1.forEach(element1 => {
                  if (typeof (element1.siteCodeExist) !== 'undefined') {
                    sitess.push({
                      'siteCodeExist': element1.siteCodeExist,
                      'name': element1.name,
                      'level': element1.siteType.siteLevel,
                      'unit': element1.unit,
                      'parent': element.name,
                      'id': element.id
                    })
                  }

                  sites2 = element1.childSite;
                  if (sites2.length > 0) {
                    sites2.forEach(element2 => {
                      if (typeof (element2.siteCodeExist) !== 'undefined') {
                        sitess.push({
                          'siteCodeExist': element2.siteCodeExist,
                          'name': element2.name,
                          'level': element2.siteType.siteLevel,
                          'unit': element2.unit,
                          'parent': element1.name,
                          'id': element.id
                        });
                      }
                      sites3 = (element2.childSite)
                    });
                  }
                });
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


  hide(event) {
    this.onHideSiteSearch.emit({
      event
    });
  }
  getIdSite(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCodeExist === id)[0]

    this.sitePopup = false;
    this.siteSearchVsb = false;
    this.hide(e);
  }
  showInfo() {
    console.log('siteSearchVsb:', this.siteSearchVsb);
    this.siteSearchVsb = true;
    console.log('siteSearchVsb:', this.siteSearchVsb);
  }
}

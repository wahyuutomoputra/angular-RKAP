import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  SiteSearchService
} from './_siteSearch.service';

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

@Component({
  selector: 'app-site-search',
  templateUrl: './_siteSearch.html',
  providers: [SiteSearchService]
})
export class SiteSearchComponent {
  @Input() siteSearchVsb;
  @Output() onHideSiteSearch = new EventEmitter();

  siteId: any;
  searchSiteById: any;

  constructor(service: SiteSearchService) {
    /* site by id fix */
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
                  'level': element.siteType.siteLevel
                }];
              }
              if (sites1.length > 0) {
                sites1.forEach(element1 => {
                  if (typeof (element1.siteCodeExist) !== 'undefined') {
                    sitess.push({
                      'siteCodeExist': element1.siteCodeExist,
                      'name': element1.name,
                      'level': element1.siteType.siteLevel
                    })
                  }

                  sites2 = element1.childSite;
                  if (sites2.length > 0) {
                    sites2.forEach(element2 => {
                      if (typeof (element2.siteCodeExist) !== 'undefined') {
                        sitess.push({
                          'siteCodeExist': element2.siteCodeExist,
                          'name': element2.name,
                          'level': element2.siteType.siteLevel
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
    this.siteSearchVsb = false;
    this.hide(id);
  }
  showInfo() {
    this.siteSearchVsb = true;
  }
}

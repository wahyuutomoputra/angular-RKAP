import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Site } from './site.model';
import { SiteService } from './site.service';

@Component({
  selector: 'app-site',
  providers: [SiteService],
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent implements OnInit {

  site: Site;
  // settingProfile: {}[] = [
  //     'Default System Setting',
  //     'SKDIR 123',
  //     'SK GM DISJAYA',
  //     'SK GM DJYT',
  // ];
  settingProfile: any[] = [
    {
      Id: 1,
      Profile: 'Default System Setting'
    },
    {
      Id: 2,
      Profile: 'SKDIR 123'
    },
    {
      Id: 3,
      Profile: 'SK GM DISJAYA'
    },
    {
      Id: 4,
      Profile: 'SK GM DJYT'
    }
  ];

  /*popup*/
  sitePopup = false;
  searchSiteById: any;

  constructor(service: SiteService) {
    this.site = service.getSite();

    /* site by id fix */
    this.searchSiteById = new DataSource({
      load: function (loadOptions) {
        let a: any;
        if (loadOptions.filter === undefined) {
          a = loadOptions.filter;
        } else {
          a = loadOptions.filter[2];
        }

        return service.getSiteByID(a).toPromise().then(resp => {
          this.dataSourceSite = resp;
          console.log('site : ', this.dataSourceSite);
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
          console.log('Error  .... ');
          console.log(err);
        });
      }
    });
  }

  getIdSite(id) {
    this.site.Site = id;
    this.sitePopup = false;
  }

  ngOnInit() {
  }

  showInfo() {
    this.sitePopup = true;
  }
  buttonClicked(){
    
  }
}

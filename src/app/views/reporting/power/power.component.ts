import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { PowerService} from './power.service';

import { Site } from './power.model';
import DataSource from 'devextreme/data/data_source';


@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css'],
  providers: [PowerService]
})
export class PowerComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;

  pivotGridDataSource: any;
  site: Site;

  /*popup*/
  sitePopup = false;
  searchSiteById: any;
  powerData: any;
  isShowInfo = false;
  siteSearchVsb = false;

  date = new Date();
  defValue = new Date(this.date.getFullYear(), this.date.getMonth());
  /* disabel Calendar */
  years: any;
  months: any;
  minimums: any;
  maximums: any;


  constructor(private service: PowerService) {
    /*disable calender reange 2 years */
    this.years = new Date((this.date.getFullYear()) - 2);
    this.months = new Date(this.date.getMonth());
    this.minimums = new Date(this.years, this.months);
    this.maximums = new Date(this.date.getFullYear(), this.months);
    this.site = this.service.getSite();
    this.site.MonthPeriode = this.defValue.toLocaleString();

    this.site = service.getSite();

    /* site by id fix */
    this.searchSiteById = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          let a: any = [];
          a = loadOptions.filter[2];
          return service.getSiteByID(a).toPromise().then(resp => {
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
                  'siteCodeExist': element.siteCodeExist,
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


  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitAxes',
      alternateDataFields: false
    });
  }

  getIdSite(id) {
    let e;
    e = this.searchSiteById._items.filter(source => source.siteCode === id)[0]
    this.site.Site = id;
    this.siteSearchVsb = false;
  }

  showInfo() {
    this.isShowInfo = true;
    this.siteSearchVsb = true;
  }

  onHideSiteSearch(event) {
    if (event.event) {
      this.site.Site = event.event.siteCodeExist;
    }
    this.isShowInfo = false;
    this.siteSearchVsb = false;
  }

  doSearch() {
    this.service.getAllSite().subscribe(site => {
      this.service.getAllByData(this.site).subscribe(resp => {
        resp.forEach((value, index) => {
          const getSite = site.find(siteItem => siteItem.siteCodeExist === value.siteCode);
          if (getSite) {
            resp[index].site = getSite.name;
          } else {
            resp[index].site = '';
          }
          resp[index].recapDate = value.recapDate.substr(0, 4) + '-' + value.recapDate.substr(4, 2) + '-' + value.recapDate.substr(6, 2)
        });
        this.powerData = resp;
        this.pivotGridDataSource = {
          fields: [{
            caption: 'Site',
            dataField: 'site',
            area: 'row'
          }, {
            caption: 'Recap Date',
            dataField: 'recapDate',
            dataType: 'date',
            groupInterval: 'year',
            area: 'column'
          }, {
            caption: 'Recap Date',
            dataField: 'recapDate',
            dataType: 'date',
            groupInterval: 'month',
            area: 'column'
          }, {
            caption: 'Recap Date',
            dataField: 'recapDate',
            dataType: 'date',
            groupInterval: 'day',
            area: 'column'
          }, {
            caption: 'Active Power',
            dataField: 'activePower',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data'
          }, {
            caption: 'Reactive Power',
            dataField: 'reactivePower',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data'
          }, {
            caption: 'Apparent Power',
            dataField: 'apparentPower',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data'
          }],
          store: this.powerData
        }
      })
    })
  }
  buttonClicked() {
  }
}

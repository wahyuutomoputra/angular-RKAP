import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DxPivotGridComponent, DxChartComponent } from 'devextreme-angular';
import { CustomerService} from './customer.service';

import {Site} from './customer.model';
import DataSource from 'devextreme/data/data_source';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;

  pivotGridDataSource: any;
  site: Site;
  sites: any[] = [];

  /*popup*/
  sitePopup = false;
  searchSiteById: any;
  locGrowthDaily: any[];
  siteSearchVsb = false;

  date = new Date();
  defValue = new Date(this.date.getFullYear(), this.date.getMonth());
  /* disabel Calendar */
  years: any;
  months: any;
  minimums: any;
  maximums: any;

  constructor(private service: CustomerService) {
    /* disable calendar reange 2 years */
    this.years = new Date((this.date.getFullYear()) - 2);
    this.months = new Date(this.date.getMonth());
    this.minimums = new Date(this.years, this.months);
    this.maximums = new Date(this.date.getFullYear(), this.months);
    this.site = this.service.getSite();
    this.site.MonthPeriode = this.defValue.toLocaleString();

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

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: 'splitPanes',
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
    this.siteSearchVsb = true;
  }

  onHideSiteSearch(event, event2) {
    this.site.Site = event.event;
    this.siteSearchVsb = false;
  }

  search() {
    this.service.getAllSite().subscribe(site => {
      this.service.getAllByData(this.site).subscribe(resp => {
        resp.forEach((value, index) => {
          const getSite = site.find(siteItem => siteItem.siteCode === value.siteCode);
          resp[index].site = getSite.name;
        });

        this.locGrowthDaily = resp;

        this.pivotGridDataSource = {
          fields: [{
            caption: 'Site',
            dataField: 'site',
            area: 'row'
          }, {
            caption: 'Tariff Category',
            dataField: 'tariffCategory',
            area: 'column'
          }, {
            caption: 'Tariff',
            dataField: 'tariff',
            area: 'column'
          }, {
            caption: 'Total',
            dataField: 'total',
            dataType: 'number',
            summaryType: 'sum',
            area: 'data'
          }],
          store: this.locGrowthDaily
        }
      });
    });
  }

  legendClickHandler(e) {
    const arg = e.target,
      item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    if (item) {
      this.toggleVisibility(item);
    } else {
      this.toggleVisibility(e.target);
    }
  }

  toggleVisibility(item) {
    if (item.isVisible()) {
      item.hide();
    } else {
      item.show();
    }
  }

}

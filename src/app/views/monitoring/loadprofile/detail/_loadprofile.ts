import {
  Search,
  MonLoadprofileService,
  Loadprofile,
  Task,
  Location,
  ArchitectureInfo,
  DateSearch
} from '../loadprofile.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  NgModule,
  enableProdMode,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnInit
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {
  DxDataGridModule
} from 'devextreme-angular';
/* grapik */
import {
  CommonModule
} from '@angular/common';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  platformBrowserDynamic
} from '@angular/platform-browser-dynamic';
import {
  DxSelectBoxModule,
  DevExtremeModule,
  DxFormModule,
  DxFormComponent,
  DxScrollViewComponent,
  DxScrollViewModule,
  DxChartModule,
  DxChartComponent
} from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  providers: [MonLoadprofileService],
  selector: 'app-detailloadprofile',
  templateUrl: './_loadprofile.html',
  // styleUrls: ['./_loadprofile.detail.css']
})
export class DetailLoadProfileComponent implements AfterViewInit, OnInit {
  @ViewChild(DxFormComponent) myforms: DxFormComponent;
  @ViewChild(DxScrollViewComponent) scrollView: DxScrollViewComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;
  types: string[] = ['spline', 'stackedspline', 'fullstackedspline'];

  @Input() detailLoadprofiles;
  @Input() detailDataLocationCode;
  @Input() detailLoadprofileGrid;
  @Input() popupVisible;
  @Output() onHideLoadprofile = new EventEmitter();
  @Output() dataSourceGrids;

  datasource: any[];
  datasourceDetailDataLoc: any = {};
  datasourceGrid: any;
  countData: any;
  isLoaded = false;
  scrollbarMode: string;
  showScrollbarModes: any[];
  scrollByContent = true;

  now: Date = new Date();
  DisableDate: Date[];

  dateSearch: DateSearch;
  service: any = {};
  updateDataSource: any[];

  /* */
  currentMode: string;
  overlappingModes: string[];

  date = new Date();
  year: any;
  month: any;
  minimum: any;
  maximum: any;

  architecturesInfo: ArchitectureInfo[];

  constructor(service: MonLoadprofileService, private route: ActivatedRoute,
    private router: Router) {
    this.service = service;
    this.currentMode = service.getOverlappingModes()[1];
    this.overlappingModes = service.getOverlappingModes();

    this.datasource = [this.detailLoadprofiles];

    this.dateSearch = {
      'startDate': '',
      'endDate': ''
    };

    this.showScrollbarModes = [{
      text: 'On Scroll',
      value: 'onScroll'
    }, {
      text: 'On Hover',
      value: 'onHover'
    }, {
      text: 'Always',
      value: 'always'
    }, {
      text: 'Never',
      value: 'never'
    }];

    this.scrollbarMode = this.showScrollbarModes[2].value;
  }

  ngOnInit() {
    this.service.getOne(this.detailLoadprofiles.meterCode, this.detailLoadprofiles.periode)
      .subscribe(resp => {
        this.detailLoadprofileGrid = resp;
        this.datasourceGrid = this.detailLoadprofileGrid;
      }, err => {
        console.log(err);
      })

    this.service.getAllData(this.detailLoadprofiles.locationCode)
      .subscribe(resp => {
        this.detailDataLocationCode = resp;
        this.isLoaded = true;
      }, err => {
        console.log(err);
      })
      if (this.detailLoadprofiles.periode) {
        this.year = this.detailLoadprofiles.periode.substring(0, 4);
        this.month = (this.detailLoadprofiles.periode.substring(4, 6)) - 1;
      }
        this.minimum = new Date(this.year, this.month, 1);
        this.maximum = new Date(this.year, this.month + 1, 0);
  }

  ngAfterViewInit() {

  }

  onLegendClick (e) {
    console.log(e);
    const series = e.target;
    if (series.name.includes('Voltage')) {
      const voltageSeries = e.component.series.filter(value => value.name.includes('Voltage'));
      voltageSeries.forEach(element => {
        if (element.isVisible()) {
          element.hide();
        } else {
          element.show();
        }
      });
    } else if (series.name.includes('Current')) {
      const currentSeries = e.component.series.filter(value => value.name.includes('Current'));
      currentSeries.forEach(element => {
        if (element.isVisible()) {
          element.hide();
        } else {
          element.show();
        }
      });
    } else {
      if (series.isVisible()) {
          series.hide();
      } else {
          series.show();
      }
    }
  };

  Test() {
    const svc = this.service;
    console.log('start date : ', this.dateSearch.startDate);
    console.log('end date : ', this.dateSearch.endDate);
    svc.searchByRangeDate(this.detailLoadprofiles.meterCode, this.dateSearch.startDate, this.dateSearch.endDate)
      .subscribe(
        resp => {
          this.updateDataSource = resp;
          this.detailLoadprofileGrid = resp;

        }, err => {
          console.log(err);
        }
      );
  }

  hide() {
    this.onHideLoadprofile.emit();
  }

  cancel() {
    this.popupVisible = false;
  }

}

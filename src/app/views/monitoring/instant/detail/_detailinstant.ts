import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  enableProdMode
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {
  DxDataGridModule,
  DevExtremeModule,
  DxChartModule
} from 'devextreme-angular';
import {
  parse
} from 'url';
import {
  InstantService
} from '../instant.service';
import {
  ContextItemService,
  ContextItem
} from './_contextItems';
import {
  MonitoringModule
} from '../../monitoring.module';

@Component({
  providers: [ContextItemService],
  selector: 'app-detailinstant',
  templateUrl: './_detailinstant.html'
})
export class DetailInstantComponent implements AfterViewInit, OnInit {
  @Input() detailInstants;
  @Input() detailInstantsPopup;
  @Input() popupVisible;
  @Input() detailInstantsHeader;
  @Output() onHideInstant = new EventEmitter();

  types: string[] = ['spline', 'stackedspline', 'fullstackedspline'];
  datasource: any[];
  datasourcePopup: any[];

  datasourceCanvas: any;
  detail: any;
  service: any = {};
  detailMerk: any;

  text: any;
  isLoaded = false;
  scrollbarMode: string;
  showScrollbarModes: any[];
  scrollByContent = true;
  target: any;
  menuVisible = false;
  contextItems: any;

  popupCanvas = false;

  constructor(service: InstantService, CIservice: ContextItemService) {
    this.service = service;
    this.contextItems = CIservice.getContextItems();
    this.datasource = [this.detailInstants];
    this.datasourcePopup = this.detailInstantsPopup;
    // this.isLoaded = true;

    // setTimeout(() => {
    //   this.isLoaded = true;
    // });

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
    this.service.getAllData(this.detailInstants.locationCode)
      .subscribe(resp => {
        this.detailInstantsHeader = resp;
        console.log (this.detailInstantsHeader);
        this.isLoaded = true;
      }, err => {
        console.log(err);
      })

    this.service.getOne(this.detailInstants.meterCode, this.detailInstants.periode)
      .subscribe(resp => {
        this.detailInstantsPopup = resp;
      }, err => {
        console.log(err);
      })
  }

  showMenu(event): void {
    this.target = event;
    this.menuVisible = true;

    this.datasourceCanvas = this.detailInstantsPopup.filter(dataSource => dataSource.id === event)[0];
    this.detail = this.detailInstantsPopup.filter(dataSource => dataSource.id === event)[0];

    this.service.getMerk(this.detailInstants.meterCode)
      .subscribe(resp => {
        this.detailMerk = resp.content[0];
        console.log('this.detail merk : ', this.detailMerk);
      }, err => {
        console.log(err);
      })
  }

  itemClick(e) {
    if (!e.itemData.items) {
      this.text = e.itemData.text;
      if (this.text === 'DetailPopup') {
        this.popupCanvas = true;
        this.popupVisible = true;
      }
    }
  }

  onHideMenu() {
    this.menuVisible = false;
  }

  ngAfterViewInit() {

  }

  hide() {
    this.onHideInstant.emit();
  }

  onHidePopup() {
    this.popupCanvas = false;
    this.popupVisible = false;
  }

}

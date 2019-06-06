import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridModule } from 'devextreme-angular';
import { EventService } from '../event.service';

@Component({
  providers: [],
  selector: 'app-detailevent',
  templateUrl: './_detailevent.html'
})


export class DetailEventComponent implements AfterViewInit, OnInit {

  @Input() detailEvents;
  @Input() popupVisible;
  @Output() onHideEvent = new EventEmitter();

  detailEventss;
  detailEventsHeader;
  datasource: any[];
  datasources: any[];
  datasourceHeader: any[];
  isLoaded = false;

  constructor(private service: EventService) {

  }

  ngAfterViewInit() {
  }

  ngOnInit() {

    this.datasource = this.detailEvents;

    this.service.getAllData(this.detailEvents.locationCode)
      .subscribe(resp => {
        this.detailEventsHeader = resp;
        this.datasourceHeader = this.detailEventsHeader;

        this.service.getOne(this.detailEvents.meterCode, this.detailEvents.periode)
          .subscribe(respEvent => {
            this.detailEventss = respEvent;
            this.datasources = this.detailEventss;
            this.isLoaded = true;
          }, err => {
            console.log(err);
          })
      }, err => {
        console.log(err);
      })
  }


  hide() {
    this.onHideEvent.emit();
  }
}

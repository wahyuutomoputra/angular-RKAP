import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {
  DxDataGridModule
} from 'devextreme-angular';

@Component({
  providers: [],
  selector: 'app-detaibilling',
  templateUrl: './_detailbilling.html'
})

export class DetailBillingComponent implements OnInit {
  @Input() detailBillings;
  @Input() detailBillingsGrid;
  @Input() detailBillingsHeader;
  @Input() popupVisible;
  @Output() onHideBilling = new EventEmitter();
  datasource: any[];
  datasourceGrid: any[];
  datasourceHeader: any[];
  isLoaded = false;

  ngOnInit() {
    console.log('komponen', this.detailBillings);
    this.datasourceHeader = this.detailBillingsHeader;
    this.datasource = [this.detailBillings];
    this.datasourceGrid = this.detailBillingsGrid;
    this.isLoaded = true;
  }

  onLegendClick (e) {
    const series = e.target;
    if (series.isVisible()) {
        series.hide();
    } else {
        series.show();
    }
  };

  hide() {
    this.onHideBilling.emit();
  }
}

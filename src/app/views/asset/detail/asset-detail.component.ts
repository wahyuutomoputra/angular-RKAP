import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { error } from 'selenium-webdriver';
import 'rxjs/add/operator/toPromise';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxFormModule,
  DxSelectBoxComponent,
  DxButtonComponent,
  DxTextBoxComponent
} from 'devextreme-angular';

import { AssetService } from './../asset.service';
import { Asset } from './../asset.model';
import { ContextItemService, ContextItem } from './../_contextItems';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css'],
  providers: [AssetService, ContextItemService]
})
export class AssetDetailComponent {
  @Input() asset;
  @Input() popupVisible;
  @Output() onHideDetail = new EventEmitter();

  hide() {
    this.onHideDetail.emit();
  }

}

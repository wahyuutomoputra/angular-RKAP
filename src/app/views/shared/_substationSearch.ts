import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  SubstationSearchService
} from './_substationSearch.service';

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
  selector: 'app-substation-search',
  templateUrl: './_substationSearch.html',
  providers: [SubstationSearchService]
})
export class SubstationSearchComponent {
  @Input() substationSearchVsb;
  @Output() onHideSubstationSearch = new EventEmitter();

  substationId: any;
  Substation: any;

  constructor(service: SubstationSearchService) {
    /* substation by id fix */
    this.Substation = new DataSource({
      load: function (loadOptions) {
        if (loadOptions.filter !== undefined) {
          return service.getLocType().toPromise().then(resp => {
            this.dataSourceSubstation = resp;
            return this.dataSourceSubstation;
          }, err => {
            console.log(err);
          });
        }
      }
    });
  }

  hide(event) {
    this.onHideSubstationSearch.emit({
      event
    });
  }

  getIdSubstation(id) {
    this.substationSearchVsb = false;
    this.hide(id);
  }
  showInfo() {
    this.substationSearchVsb = true;
  }
}

import { Component } from '@angular/core';
import { SubstationService, Substation } from './_substation';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-substation',
  templateUrl: './substation.component.html',
  styleUrls: ['./substation.component.css'],
  providers: [SubstationService]
})
export class SubstationComponent {
  dataSource: Substation[];

  constructor(
    service: SubstationService,
  ) {
    this.dataSource = service.getSubstations();
  }

}

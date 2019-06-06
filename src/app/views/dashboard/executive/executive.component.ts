import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {
  customers: any[] = [
    {
      regionOffice: 'CENTRAL REGION',
      customer: 1648,
      energyConsumption: 25067364,
      power: 21781959
    }, {
      regionOffice: 'EASTERN REGION',
      customer: 1291,
      energyConsumption: 20036632,
      power: 21535423
    }, {
      regionOffice: 'SOUTHERN REGION',
      customer: 2705,
      energyConsumption: 24350598,
      power: 20633317
    }, {
      regionOffice: 'WESTERN REGION',
      customer: 1013,
      energyConsumption: 20564104,
      power: 24045819
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

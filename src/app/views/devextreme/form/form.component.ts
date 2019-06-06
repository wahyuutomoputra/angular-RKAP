import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Employee, FormService } from './_form';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxFormComponent
} from 'devextreme-angular';

@Component({
  selector: 'app-form',
  providers: [FormService],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {
  @ViewChild(DxFormComponent) myform: DxFormComponent;
  employee: Employee;
  positions: string[];
  rules: Object;

  constructor(service: FormService) {
    this.employee = service.getEmployee();
    this.positions = service.getPositions();
    this.rules = { 'X': /[02-9]/ };
  }

  ngAfterViewInit() {
    this.myform.instance.validate()
  }


}

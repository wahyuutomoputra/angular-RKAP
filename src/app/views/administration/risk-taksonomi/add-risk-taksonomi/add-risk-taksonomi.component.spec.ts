import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiskTaksonomiComponent } from './add-risk-taksonomi.component';

describe('AddRiskTaksonomiComponent', () => {
  let component: AddRiskTaksonomiComponent;
  let fixture: ComponentFixture<AddRiskTaksonomiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRiskTaksonomiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRiskTaksonomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

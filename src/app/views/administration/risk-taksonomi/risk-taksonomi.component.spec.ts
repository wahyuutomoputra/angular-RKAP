import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTaksonomiComponent } from './risk-taksonomi.component';

describe('RiskTaksonomiComponent', () => {
  let component: RiskTaksonomiComponent;
  let fixture: ComponentFixture<RiskTaksonomiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskTaksonomiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskTaksonomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

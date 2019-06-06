import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMitigasiComponent } from './plan-mitigasi.component';

describe('PlanMitigasiComponent', () => {
  let component: PlanMitigasiComponent;
  let fixture: ComponentFixture<PlanMitigasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanMitigasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanMitigasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

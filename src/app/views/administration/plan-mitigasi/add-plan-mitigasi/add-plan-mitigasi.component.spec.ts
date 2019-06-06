import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanMitigasiComponent } from './add-plan-mitigasi.component';

describe('AddPlanMitigasiComponent', () => {
  let component: AddPlanMitigasiComponent;
  let fixture: ComponentFixture<AddPlanMitigasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanMitigasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanMitigasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

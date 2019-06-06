import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanKspkkComponent } from './persetujuan-kspkk.component';

describe('PersetujuanKspkkComponent', () => {
  let component: PersetujuanKspkkComponent;
  let fixture: ComponentFixture<PersetujuanKspkkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanKspkkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanKspkkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

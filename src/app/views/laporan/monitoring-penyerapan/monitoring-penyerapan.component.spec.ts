import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringPenyerapanComponent } from './monitoring-penyerapan.component';

describe('MonitoringPenyerapanComponent', () => {
  let component: MonitoringPenyerapanComponent;
  let fixture: ComponentFixture<MonitoringPenyerapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringPenyerapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPenyerapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

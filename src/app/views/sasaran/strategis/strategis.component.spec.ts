import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategisComponent } from './strategis.component';

describe('StrategisComponent', () => {
  let component: StrategisComponent;
  let fixture: ComponentFixture<StrategisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

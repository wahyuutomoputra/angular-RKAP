import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanComponent } from './persetujuan.component';

describe('PersetujuanComponent', () => {
  let component: PersetujuanComponent;
  let fixture: ComponentFixture<PersetujuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

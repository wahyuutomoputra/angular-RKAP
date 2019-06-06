import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanCofinComponent } from './persetujuan-cofin.component';

describe('PersetujuanCofinComponent', () => {
  let component: PersetujuanCofinComponent;
  let fixture: ComponentFixture<PersetujuanCofinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanCofinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanCofinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

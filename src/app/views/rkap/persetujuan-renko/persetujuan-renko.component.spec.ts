import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanRenkoComponent } from './persetujuan-renko.component';

describe('PersetujuanRenkoComponent', () => {
  let component: PersetujuanRenkoComponent;
  let fixture: ComponentFixture<PersetujuanRenkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanRenkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanRenkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

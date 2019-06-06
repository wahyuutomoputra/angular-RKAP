import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanGmComponent } from './persetujuan-gm.component';

describe('PersetujuanGmComponent', () => {
  let component: PersetujuanGmComponent;
  let fixture: ComponentFixture<PersetujuanGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanBodComponent } from './persetujuan-bod.component';

describe('PersetujuanBodComponent', () => {
  let component: PersetujuanBodComponent;
  let fixture: ComponentFixture<PersetujuanBodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanBodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanBodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

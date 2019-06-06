import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanMrComponent } from './persetujuan-mr.component';

describe('PersetujuanMrComponent', () => {
  let component: PersetujuanMrComponent;
  let fixture: ComponentFixture<PersetujuanMrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanMrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanMrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

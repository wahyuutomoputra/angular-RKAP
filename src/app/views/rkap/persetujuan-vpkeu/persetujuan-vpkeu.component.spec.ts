import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersetujuanVpkeuComponent } from './persetujuan-vpkeu.component';

describe('PersetujuanVpkeuComponent', () => {
  let component: PersetujuanVpkeuComponent;
  let fixture: ComponentFixture<PersetujuanVpkeuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersetujuanVpkeuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersetujuanVpkeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatuanComponent } from './satuan.component';

describe('SatuanComponent', () => {
  let component: SatuanComponent;
  let fixture: ComponentFixture<SatuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

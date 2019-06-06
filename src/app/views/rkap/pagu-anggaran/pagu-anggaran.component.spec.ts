import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaguAnggaranComponent } from './pagu-anggaran.component';

describe('PaguAnggaranComponent', () => {
  let component: PaguAnggaranComponent;
  let fixture: ComponentFixture<PaguAnggaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaguAnggaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaguAnggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

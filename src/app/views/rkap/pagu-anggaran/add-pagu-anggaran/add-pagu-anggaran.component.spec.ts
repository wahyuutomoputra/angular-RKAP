import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaguAnggaranComponent } from './add-pagu-anggaran.component';

describe('AddPaguAnggaranComponent', () => {
  let component: AddPaguAnggaranComponent;
  let fixture: ComponentFixture<AddPaguAnggaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaguAnggaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaguAnggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

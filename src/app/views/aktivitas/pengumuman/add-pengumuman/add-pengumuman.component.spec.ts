import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPengumumanComponent } from './add-pengumuman.component';

describe('AddPengumumanComponent', () => {
  let component: AddPengumumanComponent;
  let fixture: ComponentFixture<AddPengumumanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPengumumanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPengumumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

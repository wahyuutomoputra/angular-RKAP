import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSatuanComponent } from './add-satuan.component';

describe('AddSatuanComponent', () => {
  let component: AddSatuanComponent;
  let fixture: ComponentFixture<AddSatuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSatuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSatuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

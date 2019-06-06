import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndikatorInputComponent } from './add-indikator-input.component';

describe('AddIndikatorInputComponent', () => {
  let component: AddIndikatorInputComponent;
  let fixture: ComponentFixture<AddIndikatorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndikatorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndikatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

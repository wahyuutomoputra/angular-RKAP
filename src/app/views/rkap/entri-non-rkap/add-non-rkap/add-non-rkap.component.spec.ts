import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonRkapComponent } from './add-non-rkap.component';

describe('AddNonRkapComponent', () => {
  let component: AddNonRkapComponent;
  let fixture: ComponentFixture<AddNonRkapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNonRkapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNonRkapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

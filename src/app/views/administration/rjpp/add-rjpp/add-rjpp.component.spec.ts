import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRJPPComponent } from './add-rjpp.component';

describe('AddRJPPComponent', () => {
  let component: AddRJPPComponent;
  let fixture: ComponentFixture<AddRJPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRJPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRJPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

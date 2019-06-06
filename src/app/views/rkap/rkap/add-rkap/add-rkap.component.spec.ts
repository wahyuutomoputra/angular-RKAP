import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRKAPComponent } from './add-rkap.component';

describe('AddRKAPComponent', () => {
  let component: AddRKAPComponent;
  let fixture: ComponentFixture<AddRKAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRKAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRKAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

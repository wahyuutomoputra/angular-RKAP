import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupTaksonomiComponent } from './add-group-taksonomi.component';

describe('AddGroupTaksonomiComponent', () => {
  let component: AddGroupTaksonomiComponent;
  let fixture: ComponentFixture<AddGroupTaksonomiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupTaksonomiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupTaksonomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRabComponent } from './add-rab.component';

describe('AddRabComponent', () => {
  let component: AddRabComponent;
  let fixture: ComponentFixture<AddRabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

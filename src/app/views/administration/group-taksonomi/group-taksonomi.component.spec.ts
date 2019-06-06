import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTaksonomiComponent } from './group-taksonomi.component';

describe('GroupTaksonomiComponent', () => {
  let component: GroupTaksonomiComponent;
  let fixture: ComponentFixture<GroupTaksonomiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTaksonomiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTaksonomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

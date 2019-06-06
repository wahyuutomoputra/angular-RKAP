import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiatisComponent } from './inisiatis.component';

describe('InisiatisComponent', () => {
  let component: InisiatisComponent;
  let fixture: ComponentFixture<InisiatisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiatisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

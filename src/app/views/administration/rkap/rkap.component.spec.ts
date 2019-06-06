import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RKAPComponent } from './rkap.component';

describe('RKAPComponent', () => {
  let component: RKAPComponent;
  let fixture: ComponentFixture<RKAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RKAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RKAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

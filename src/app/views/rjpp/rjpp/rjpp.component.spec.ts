import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RjppComponent } from './rjpp.component';

describe('RjppComponent', () => {
  let component: RjppComponent;
  let fixture: ComponentFixture<RjppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RjppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RjppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

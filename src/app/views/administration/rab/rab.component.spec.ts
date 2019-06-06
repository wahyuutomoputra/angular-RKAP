import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabComponent } from './rab.component';

describe('RabComponent', () => {
  let component: RabComponent;
  let fixture: ComponentFixture<RabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

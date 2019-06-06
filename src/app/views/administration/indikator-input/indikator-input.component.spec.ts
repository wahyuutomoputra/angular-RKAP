import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndikatorInputComponent } from './indikator-input.component';

describe('IndikatorInputComponent', () => {
  let component: IndikatorInputComponent;
  let fixture: ComponentFixture<IndikatorInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndikatorInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndikatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

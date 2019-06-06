import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndikatorOutputComponent } from './indikator-output.component';

describe('IndikatorOutputComponent', () => {
  let component: IndikatorOutputComponent;
  let fixture: ComponentFixture<IndikatorOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndikatorOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndikatorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

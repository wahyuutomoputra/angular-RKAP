import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetTahunanComponent } from './target-tahunan.component';

describe('TargetTahunanComponent', () => {
  let component: TargetTahunanComponent;
  let fixture: ComponentFixture<TargetTahunanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetTahunanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetTahunanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

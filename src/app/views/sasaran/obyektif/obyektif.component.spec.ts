import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObyektifComponent } from './obyektif.component';

describe('ObyektifComponent', () => {
  let component: ObyektifComponent;
  let fixture: ComponentFixture<ObyektifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObyektifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObyektifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

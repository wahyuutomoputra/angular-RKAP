import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriNonRkapComponent } from './entri-non-rkap.component';

describe('EntriNonRkapComponent', () => {
  let component: EntriNonRkapComponent;
  let fixture: ComponentFixture<EntriNonRkapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntriNonRkapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriNonRkapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengumumanComponent } from './pengumuman.component';

describe('PengumumanComponent', () => {
  let component: PengumumanComponent;
  let fixture: ComponentFixture<PengumumanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengumumanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengumumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

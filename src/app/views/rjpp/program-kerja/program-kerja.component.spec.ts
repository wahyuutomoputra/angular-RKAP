import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramKerjaComponent } from './program-kerja.component';

describe('ProgramKerjaComponent', () => {
  let component: ProgramKerjaComponent;
  let fixture: ComponentFixture<ProgramKerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramKerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

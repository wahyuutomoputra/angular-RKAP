import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramKerjaComponent } from './add-program-kerja.component';

describe('AddProgramKerjaComponent', () => {
  let component: AddProgramKerjaComponent;
  let fixture: ComponentFixture<AddProgramKerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramKerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

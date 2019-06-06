import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndikatorOutputComponent } from './add-indikator-output.component';

describe('AddIndikatorOutputComponent', () => {
  let component: AddIndikatorOutputComponent;
  let fixture: ComponentFixture<AddIndikatorOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndikatorOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndikatorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

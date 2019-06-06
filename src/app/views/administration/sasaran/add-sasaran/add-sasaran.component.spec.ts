import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSasaranComponent } from './add-sasaran.component';

describe('AddSasaranComponent', () => {
  let component: AddSasaranComponent;
  let fixture: ComponentFixture<AddSasaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSasaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSasaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

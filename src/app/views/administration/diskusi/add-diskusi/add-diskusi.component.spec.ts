import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiskusiComponent } from './add-diskusi.component';

describe('AddDiskusiComponent', () => {
  let component: AddDiskusiComponent;
  let fixture: ComponentFixture<AddDiskusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiskusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiskusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

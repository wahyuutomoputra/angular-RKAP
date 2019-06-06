import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRkapReleaseComponent } from './add-rkap-release.component';

describe('AddRkapReleaseComponent', () => {
  let component: AddRkapReleaseComponent;
  let fixture: ComponentFixture<AddRkapReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRkapReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRkapReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

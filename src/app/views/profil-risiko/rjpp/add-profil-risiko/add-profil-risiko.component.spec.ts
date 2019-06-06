import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilRisikoComponent } from './add-profil-risiko.component';

describe('AddProfilRisikoComponent', () => {
  let component: AddProfilRisikoComponent;
  let fixture: ComponentFixture<AddProfilRisikoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfilRisikoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfilRisikoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

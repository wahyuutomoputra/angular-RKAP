import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRisikoComponent } from './profil-risiko.component';

describe('ProfilRisikoComponent', () => {
  let component: ProfilRisikoComponent;
  let fixture: ComponentFixture<ProfilRisikoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilRisikoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilRisikoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

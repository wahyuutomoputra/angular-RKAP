import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriRealisasiComponent } from './entri-realisasi.component';

describe('EntriRealisasiComponent', () => {
  let component: EntriRealisasiComponent;
  let fixture: ComponentFixture<EntriRealisasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntriRealisasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriRealisasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapitulasiReleaseComponent } from './rekapitulasi-release.component';

describe('RekapitulasiReleaseComponent', () => {
  let component: RekapitulasiReleaseComponent;
  let fixture: ComponentFixture<RekapitulasiReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekapitulasiReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapitulasiReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

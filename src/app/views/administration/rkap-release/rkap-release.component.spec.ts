import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RkapReleaseComponent } from './rkap-release.component';

describe('RkapReleaseComponent', () => {
  let component: RkapReleaseComponent;
  let fixture: ComponentFixture<RkapReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RkapReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RkapReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

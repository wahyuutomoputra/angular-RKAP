import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskusiComponent } from './diskusi.component';

describe('DiskusiComponent', () => {
  let component: DiskusiComponent;
  let fixture: ComponentFixture<DiskusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

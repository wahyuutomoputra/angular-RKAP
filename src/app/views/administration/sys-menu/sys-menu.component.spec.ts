import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysMenuComponent } from './sys-menu.component';

describe('SysMenuComponent', () => {
  let component: SysMenuComponent;
  let fixture: ComponentFixture<SysMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

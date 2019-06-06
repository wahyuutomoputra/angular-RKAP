import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersetujuanGmComponent } from './add-persetujuan-gm.component';

describe('AddPersetujuanGmComponent', () => {
  let component: AddPersetujuanGmComponent;
  let fixture: ComponentFixture<AddPersetujuanGmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersetujuanGmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersetujuanGmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersetujuanComponent } from './add-persetujuan.component';

describe('AddPersetujuanComponent', () => {
  let component: AddPersetujuanComponent;
  let fixture: ComponentFixture<AddPersetujuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersetujuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersetujuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

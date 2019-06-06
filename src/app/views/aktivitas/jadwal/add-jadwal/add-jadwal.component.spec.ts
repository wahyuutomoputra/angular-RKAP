import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJadwalComponent } from './add-jadwal.component';

describe('AddJadwalComponent', () => {
  let component: AddJadwalComponent;
  let fixture: ComponentFixture<AddJadwalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJadwalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJadwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

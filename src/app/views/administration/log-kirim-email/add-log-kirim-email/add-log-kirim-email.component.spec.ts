import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogKirimEmailComponent } from './add-log-kirim-email.component';

describe('AddLogKirimEmailComponent', () => {
  let component: AddLogKirimEmailComponent;
  let fixture: ComponentFixture<AddLogKirimEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLogKirimEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogKirimEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

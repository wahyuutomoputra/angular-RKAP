import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogKirimEmailComponent } from './log-kirim-email.component';

describe('LogKirimEmailComponent', () => {
  let component: LogKirimEmailComponent;
  let fixture: ComponentFixture<LogKirimEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogKirimEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogKirimEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

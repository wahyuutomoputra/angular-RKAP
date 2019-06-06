import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRKAPComponent } from './document-rkap.component';

describe('DocumentRKAPComponent', () => {
  let component: DocumentRKAPComponent;
  let fixture: ComponentFixture<DocumentRKAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentRKAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentRKAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

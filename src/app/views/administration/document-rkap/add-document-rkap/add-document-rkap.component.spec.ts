import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentRkapComponent } from './add-document-rkap.component';

describe('AddDocumentRkapComponent', () => {
  let component: AddDocumentRkapComponent;
  let fixture: ComponentFixture<AddDocumentRkapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentRkapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentRkapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

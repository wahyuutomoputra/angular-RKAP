import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupProductComponent } from './add-group-product.component';

describe('AddGroupProductComponent', () => {
  let component: AddGroupProductComponent;
  let fixture: ComponentFixture<AddGroupProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

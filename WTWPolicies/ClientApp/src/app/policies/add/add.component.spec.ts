import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

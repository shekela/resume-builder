import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactTextComponent } from './edit-contact-text.component';

describe('EditContactTextComponent', () => {
  let component: EditContactTextComponent;
  let fixture: ComponentFixture<EditContactTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

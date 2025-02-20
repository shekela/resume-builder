import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTextComponent } from './contact-text.component';

describe('ContactTextComponent', () => {
  let component: ContactTextComponent;
  let fixture: ComponentFixture<ContactTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

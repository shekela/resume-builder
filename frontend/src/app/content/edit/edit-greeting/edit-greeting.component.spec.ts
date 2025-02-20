import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGreetingComponent } from './edit-greeting.component';

describe('EditGreetingComponent', () => {
  let component: EditGreetingComponent;
  let fixture: ComponentFixture<EditGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGreetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

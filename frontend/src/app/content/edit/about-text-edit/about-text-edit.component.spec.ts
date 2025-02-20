import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTextEditComponent } from './about-text-edit.component';

describe('AboutTextEditComponent', () => {
  let component: AboutTextEditComponent;
  let fixture: ComponentFixture<AboutTextEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTextEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrodcutionComponent } from './introdcution.component';

describe('IntrodcutionComponent', () => {
  let component: IntrodcutionComponent;
  let fixture: ComponentFixture<IntrodcutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrodcutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntrodcutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

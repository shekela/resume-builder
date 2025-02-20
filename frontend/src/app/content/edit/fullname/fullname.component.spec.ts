import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullnameComponent } from './fullname.component';

describe('FullnameComponent', () => {
  let component: FullnameComponent;
  let fixture: ComponentFixture<FullnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

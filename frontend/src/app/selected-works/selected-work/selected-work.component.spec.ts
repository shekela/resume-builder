import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWorkComponent } from './selected-work.component';

describe('SelectedWorkComponent', () => {
  let component: SelectedWorkComponent;
  let fixture: ComponentFixture<SelectedWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

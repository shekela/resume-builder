import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedWorksComponent } from './selected-works.component';

describe('SelectedWorksComponent', () => {
  let component: SelectedWorksComponent;
  let fixture: ComponentFixture<SelectedWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

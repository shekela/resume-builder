import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentContentComponent } from './current-content.component';

describe('CurrentContentComponent', () => {
  let component: CurrentContentComponent;
  let fixture: ComponentFixture<CurrentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsListComponent } from './awards-list.component';

describe('AwardsListComponent', () => {
  let component: AwardsListComponent;
  let fixture: ComponentFixture<AwardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

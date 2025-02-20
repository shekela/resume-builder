import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsEditComponent } from './skills-edit.component';

describe('SkillsEditComponent', () => {
  let component: SkillsEditComponent;
  let fixture: ComponentFixture<SkillsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

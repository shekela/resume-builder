import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsFormComponent } from './skills-form.component';

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent;
  let fixture: ComponentFixture<SkillsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

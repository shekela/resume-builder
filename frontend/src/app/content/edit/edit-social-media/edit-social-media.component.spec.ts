import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocialMediaComponent } from './edit-social-media.component';

describe('EditSocialMediaComponent', () => {
  let component: EditSocialMediaComponent;
  let fixture: ComponentFixture<EditSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSocialMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

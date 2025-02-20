import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsCertificatesComponent } from './awards-certificates.component';

describe('AwardsCertificatesComponent', () => {
  let component: AwardsCertificatesComponent;
  let fixture: ComponentFixture<AwardsCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

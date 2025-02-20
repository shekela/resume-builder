import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRedoComponent } from './panel-redo.component';

describe('PanelRedoComponent', () => {
  let component: PanelRedoComponent;
  let fixture: ComponentFixture<PanelRedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelRedoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelRedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

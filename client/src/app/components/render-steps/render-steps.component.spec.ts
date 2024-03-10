import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderStepsComponent } from './render-steps.component';

describe('RenderStepsComponent', () => {
  let component: RenderStepsComponent;
  let fixture: ComponentFixture<RenderStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenderStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

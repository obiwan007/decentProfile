import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderStepComponent } from './render-step.component';

describe('RenderStepComponent', () => {
  let component: RenderStepComponent;
  let fixture: ComponentFixture<RenderStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderStepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenderStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

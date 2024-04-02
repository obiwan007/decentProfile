import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSliderComponent } from './button-slider.component';

describe('ButtonSliderComponent', () => {
  let component: ButtonSliderComponent;
  let fixture: ComponentFixture<ButtonSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

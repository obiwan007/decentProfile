import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedProfileEditComponent } from './advanced-profile-edit.component';

describe('AdvancedProfileEditComponent', () => {
  let component: AdvancedProfileEditComponent;
  let fixture: ComponentFixture<AdvancedProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancedProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

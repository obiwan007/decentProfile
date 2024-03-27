import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DFlowProfileEditComponent } from './d-flow-profile-edit.component';

describe('DFlowProfileEditComponent', () => {
  let component: DFlowProfileEditComponent;
  let fixture: ComponentFixture<DFlowProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DFlowProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DFlowProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicProfileEditComponent } from './basic-profile-edit.component';

describe('BasicProfileEditComponent', () => {
  let component: BasicProfileEditComponent;
  let fixture: ComponentFixture<BasicProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

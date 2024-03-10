import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListPageComponent } from './profile-list-page.component';

describe('ProfileListPageComponent', () => {
  let component: ProfileListPageComponent;
  let fixture: ComponentFixture<ProfileListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

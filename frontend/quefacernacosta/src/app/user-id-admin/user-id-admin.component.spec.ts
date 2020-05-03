import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdAdminComponent } from './user-id-admin.component';

describe('UserIdAdminComponent', () => {
  let component: UserIdAdminComponent;
  let fixture: ComponentFixture<UserIdAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

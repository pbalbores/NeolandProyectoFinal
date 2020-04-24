import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSub01Component } from './header-sub01.component';

describe('HeaderSub01Component', () => {
  let component: HeaderSub01Component;
  let fixture: ComponentFixture<HeaderSub01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSub01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSub01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosThisweekComponent } from './eventos-thisweek.component';

describe('EventosThisweekComponent', () => {
  let component: EventosThisweekComponent;
  let fixture: ComponentFixture<EventosThisweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosThisweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosThisweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

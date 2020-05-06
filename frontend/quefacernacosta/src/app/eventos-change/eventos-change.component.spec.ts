import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosChangeComponent } from './eventos-change.component';

describe('EventosChangeComponent', () => {
  let component: EventosChangeComponent;
  let fixture: ComponentFixture<EventosChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
